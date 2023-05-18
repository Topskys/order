const Carts = require('../models/cart');
const Rooms = require('../models/room');
const Users = require('../models/user');
const crud = require('./crudUtil');
const { success, responseSelf, exception, fail } = require("../util/response");
const dtf = require('../util/dateTimeFormat');


/**
 * 购物车新增商品
 * @param ctx
 * @returns {Promise<void>}
 */
const add = async ctx => {
    let params = ctx.request.body;
    let flag = false

    // 查找该订单是否已经存在，防止加入购物车的统一房间数量大于1
    await Carts.findOne({
        phone: params.phone,
        roomId: params.roomId,
        status: '0'
    }).then(rel => {
        if (rel) {
            flag = false
        } else {
            flag = true
        }
    }).catch(err => {
        exception(ctx, err)
    })

    // 如果没有找到，则可以加入购物车
    if (flag) {
        // 获取房间信息
        await crud.findOne(ctx, Rooms, { _id: params.roomId }, rel => params.room = rel)
        // 加入购物车数据库表
        await crud.add(ctx, Carts, params, rel => success(ctx, rel, 200, "加入购物车成功"))
    } else {
        ctx.body = {
            code: 200,
            msg: "该房间已存在",
        }
    }
}


/**
 * 删除购物车商品
 * @param ctx
 * @returns {Promise<void>}
 */
const del = async ctx => {
    await crud.del(ctx, Carts, { _id: ctx.params.id }, rel => {
        ctx.body = {
            code: 200,
            msg: "订单取消成功",
            data: rel
        }
    });
}


/**
 * 更新购物车商品
 * @param ctx
 * @returns {Promise<void>}
 */
const update = async ctx => {
    let flag = false
    let params = ctx.request.body;

    const resp = (rel) => {
        if (rel && rel.modifiedCount > 0) {
            ctx.body = {
                code: 200,
                msg: "操作成功",
                data: rel
            }
        } else {
            fail(ctx, undefined, 400, "请求失败")
        }
    }

    // 入住 或 退房
    if (["2", "3"].includes(params.status)) {
        console.log("----2-3---", params)
        await crud.update(ctx, Users, { _id: params.userId }, {
            $set: {
                room_number: params.status == "2" ? (params.room.room_number || Math.random() * 999) : '',
                updateTime: dtf(undefined, "YYYY-MM-DD hh:mm:ss")
            }
        }, rel => resp(rel))
    }

    await crud.update(ctx, Carts, {
        _id: params._id
    }, {
        ...params,
        updateTime: dtf(undefined, "YYYY-MM-DD hh:mm:ss")
    }, rel => resp(rel))
}


// 选择订单项
const setChecked = async ctx => {
    let cart
    const { id = '' } = ctx.params
    await crud.findOne(ctx, Carts, { _id: id }, rel => (cart = rel))

    await crud.update(ctx, Carts, { _id: id }, {
        $set: {
            checked: !cart.checked
        }
    }, rel => {
        if (rel && rel.modifiedCount > 0) {
            ctx.body = {
                code: 200,
                msg: "操作成功",
                data: rel
            }
        } else {
            fail(ctx, undefined, 400, "请求失败")
        }
    })
}


/**
 * 用顾客查询购物车的所有商品
 * @param ctx
 * @returns {Promise<void>}
 */
const queryAll = ctx => {
    let { page = 1, pageSize = 10, phone = '' } = ctx.query;

    if (!phone) return fail(ctx, null, 400, '请重新登录');

    return crud.findByPagination(ctx, Carts, { page, pageSize }, { phone });
}


/**
 * 后台查询购物车的所有商品
 * @param ctx
 * @returns {Promise<void>}
 */
const findAll = async ctx => crud.findByPagination(ctx, Carts, ctx.query, { keyword: new RegExp(ctx.query.keyword || '') });


/**
 * 通过_id查询房间订单信息
 * @param ctx
 * @returns {Promise<void>}
 */
const findById = async ctx => await crud.findOne(ctx, Carts, { _id: ctx.params.id });


/**
 * 支付订单
 * @param ctx
 */
const pay = async ctx => {
    let [params, update, user] = [ctx.request.body, null, null];

    // 查找用户信息
    await crud.findOne(ctx, Users, { _id: params.userId }, rel => (user = rel))

    // 查找订单
    await crud.findOne(ctx, Carts, { _id: params._id, status: '0' }, rel => {
        if (rel) {
            rel.total = user.discounts.length > 0 ? (params.room.price - Math.max(...user.discounts)) : params.total
            rel.payType = params.payType
            rel.status = '1' // 待入住
            rel.updateTime = dtf(undefined, "YYYY-MM-DD hh:mm:ss")
            update = rel
        } else {
            fail(ctx, rel, 400, '支付失败')
        }
    })

    // 更新用户信息
    const fun = (options) => crud.update(ctx, Users, { _id: params.userId }, {
        $set: {
            ...options,
            updateTime: dtf(undefined, "YYYY-MM-DD hh:mm:ss")
        }
    })

    // 余额支付
    if (params.payType === "余额支付") {
        user.balance = +(user.balance - update.total).toFixed(2);
        user.balance < 0 ? (update = null, params.discount = 0, fail(ctx, null, 400, '余额不足')) : await fun({ balance: user.balance });
    }

    // 优惠劵
    params.discount > 0 && await fun({ discounts: user.discounts.filter(x => x !== params.discount && x) })


    // 更新订单信息
    update && await crud.update(ctx, Carts, { _id: update._id }, update, rel => responseSelf(ctx, {
        code: rel ? 200 : 400,
        msg: rel ? '支付成功' : '支付失败',
        data: {
            ...rel,
            price: update.total,// 支付金额
            _id: update._id,// 订单编号
            receiver: '海健大酒店',// 收款账户
            createTime: dtf(Date.now(), "YYYY-MM-DD hh:mm:ss"),// 下单时间
            payType: update.payType,// 支付方式
            // roomNumber: update.roomNumber, // 房间号
        }
    }))
}


/**
 * 房间清洁
 * @param ctx
 * @returns {Promise<void>}
 */
async function clear(ctx) {
    const { room_number = '', phone = '', order = '', nickName = '', userId = '' } = ctx.request.body
    if (!room_number || !phone || !order || !nickName || !userId) return fail(ctx, undefined, 400, '请稍后重试');

    await crud.update(ctx, Carts, { room_number }, {
        $set: {
            status: 'clear',// 清洁
            updateTime: dtf(undefined, "YYYY-MM-DD hh:mm:ss")
        }
    })
}


module.exports = {
    add,
    del,
    update,
    queryAll,
    findAll,
    findById,
    pay,
    clear,
    setChecked,
}
