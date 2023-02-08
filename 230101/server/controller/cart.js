const Carts = require('../models/cart');
const Rooms = require('../models/room');
const Users = require('../models/user');
const crud = require('./crudUtil');
const {success, responseSelf, exception, fail} = require("../util/response");
const dtf = require('../util/dateTimeFormat');


/**
 * 购物车新增商品
 * @param ctx
 * @returns {Promise<void>}
 */
const add = async ctx => {
    let params = ctx.request.body;
    let [update, flag] = [null, false];

    await Carts.findOne({phone: params.phone, roomId: params.roomId, status: '0'})
        .then(rel => { // 条件并列查询 ---- roomId and status
            if (rel) {
                rel.number = (isNaN(rel.number) ? rel.number : Number(rel.number)) + 1
                rel.updateTime = dtf()
                update = rel
            } else {
                flag = true
            }
        }).catch(err => {
            exception(ctx, err)
        })
    !flag && await crud.update(ctx, Carts, {_id: update._id}, update)


    if (flag) {

        params = {
            ...params,
            // roomNumber: `${Date.now()}`.slice(9) // 房间号
        }

        await crud.findOne(ctx, Rooms, {_id: params.roomId}, rel => params.room = rel)

        await crud.add(ctx, Carts, params, rel => success(ctx, rel))
    }
}


/**
 * 删除购物车商品
 * @param ctx
 * @returns {Promise<void>}
 */
const del = async ctx => await crud.del(ctx, Carts, {_id: ctx.params.id})


/**
 * 更新购物车商品
 * @param ctx
 * @returns {Promise<void>}
 */
const update = async ctx => {
    let params= ctx.request.body;

    // 入住 或 退房
    ["2","3"].includes(params.status) && await crud.update(ctx, Users, {_id: params.userId}, {
        $set: {
            room_number: params.status === "2"?params.room_number:'',
            updateTime: dtf(undefined, "YYYY-MM-DD hh:mm:ss")
        }
    })

    await crud.update(ctx, Carts, {_id: params._id}, {...params, updateTime: dtf(undefined, "YYYY-MM-DD hh:mm:ss")})
}


/**
 * 用顾客查询购物车的所有商品
 * @param ctx
 * @returns {Promise<void>}
 */
const queryAll = ctx => {
    let {page = 1, pageSize = 10, phone = ''} = ctx.query;

    if (!phone) return fail(ctx, null, 400, '请重新登录');

    return crud.findByPagination(ctx, Carts, {page, pageSize}, {phone});
}


/**
 * 后台查询购物车的所有商品
 * @param ctx
 * @returns {Promise<void>}
 */
const findAll = async ctx => crud.findByPagination(ctx, Carts, ctx.query, {keyword: new RegExp(ctx.query.keyword || '')});


/**
 * 通过_id查询房间订单信息
 * @param ctx
 * @returns {Promise<void>}
 */
const findById = async ctx => await crud.findOne(ctx, Carts, {_id: ctx.params.id});


/**
 * 支付订单
 * @param ctx
 */
const pay = async ctx => {
    let [params, update, user] = [ctx.request.body, null, null];

    // 查找用户信息
    await crud.findOne(ctx, Users, {_id: params.userId}, rel => (user = rel))

    // 查找订单
    await crud.findOne(ctx, Carts, {_id: params._id, status: '0'}, rel => {
        if (rel) {
            rel.total = user.discounts.length > 0 ? (params.room.price - Math.max(...user.discounts)) : params.total
            rel.payType = params.payType
            rel.status = '1' // 待入住
            rel.updateTime = dtf(undefined, "YYYY-MM-DD hh:mm:ss")
            update = rel
        } else {
            fail(ctx, rel, 300, '支付失败')
        }
    })

    // 更新用户信息
    const fun = (options) => crud.update(ctx, Users, {_id: params.userId}, {
        $set: {
            ...options,
            updateTime: dtf(undefined, "YYYY-MM-DD hh:mm:ss")
        }
    })

    // 余额支付
    if (params.payType === "余额支付") {
        user.balance = +(user.balance - update.total).toFixed(2);
        user.balance < 0 ? (update = null, params.discount = 0, fail(ctx, null, 300, '余额不足')) : await fun({balance: user.balance});
    }

    // 优惠劵
    params.discount > 0 && await fun({discounts: user.discounts.filter(x => x !== params.discount && x)})


    // 更新订单信息
    update && await crud.update(ctx, Carts, {_id: update._id}, update, rel => responseSelf(ctx, {
        code: rel ? 200 : 300,
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
    let [{roomNumber}, update] = [ctx.request.body, null];
    if (!roomNumber) return fail(ctx, undefined, 400, '您或暂未入住');

    await crud.update(ctx, Carts, {roomNumber}, {
        $set: {
            status: 1,// 清洁
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
}
