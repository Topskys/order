const jwt = require('jsonwebtoken')
const Users = require('../models/user')
const Dashboard = require('../models/dashboard');
const crud = require('../controller/crudUtil');
const {responseSelf, fail, exception} = require('../util/response')
const dtf = require('../util/dateTimeFormat');


/**
 * 更新用户信息
 * @param ctx
 * @returns {Promise<void>}
 */
const update = async ctx => {
    let params = ctx.request.body;
    params = {
        ...params,
        // gender: params.gender.includes('女') ? '1' : '0',
        updateTime: dtf(Date.now(), "YYYY-MM-DD hh:mm:ss")
    }
    await crud.update(ctx, Users, {_id: params._id}, params)
}


/**
 * 查询所有用户，支持带条件查询
 * @param ctx
 * @returns {Promise<void>}
 */
const findAll = async ctx => {
    let {page = 1, pageSize = 10, keyword = ''} = ctx.query;
    let query = {phone: new RegExp(keyword)}

    // 判断页码
    !page || isNaN(Number(page)) ? (page = 1) : (page = Number(page))


    // 计算总页数
    let count = 0;
    let totalPage = 0;
    await Users.find(query).count().then(rel => (count = rel))
    count > 0 && (totalPage = Math.ceil(count / pageSize))


    // 判断当前页码的范围
    if (totalPage > 0 && page > totalPage) {
        page = totalPage
    } else if (page < 1) {
        page = 1
    }

    // 计算起始位置
    let start = (page - 1) * pageSize

    await Users.find(query).skip(start).limit(pageSize).then(rel => {
        rel ? responseSelf(ctx, {
            code: 200,
            msg: 'success',
            data: rel,
            page,
            pageSize,
            total: count
        }) : fail(ctx, rel)
    }).catch(err => {
        exception(ctx, err)
    })
}


/**
 * 用户登录
 * @param ctx
 * @returns {Promise<void>}
 */
const login = async ctx => {
    let [{phone, nickName}, token, flag, dashboard] = [ctx.request.body, null, false, null];
    if (!phone || !nickName) return fail(ctx, null, 300, '手机号或昵称不能为空');


    // 登录相关操作
    const fun = (ctx, rel) => {
        token = jwt.sign({
            nickName: rel.nickName,
            _id: rel._id,
        }, '2311-server-jwt', {
            expiresIn: 3600 * 24 * 7 // 7 days
        })

        // responseSelf(ctx, {
        //     code: 200,
        //     msg: "登录成功",
        //     token,
        //     // userInfo:rel
        // })
    }

    // 执行登录操作
    await crud.findOne(ctx, Users, {nickName: nickName, phone: phone}, rel => rel ? fun(ctx, rel) : (flag = true))


    // 新增用户并执行登录操作
    flag && await crud.add(ctx, Users, ctx.request.body, rel => rel ? fun(ctx, rel) : fail(ctx, rel, 300, "登录失败"))

    // 更新Dashboard的访问量
    if (token) {
        await crud.findOne(ctx, Dashboard, {}, rel => (dashboard = rel));

        await crud.update(ctx, Dashboard, {_id: dashboard._id}, {
            $set: {
                visitor: dashboard.visitor + 1,
                updateTime: dtf(undefined, "YYYY-MM-DD hh:mm:ss")
            }
        }, rel => rel.modifiedCount > 0 && responseSelf(ctx, {
            code: 200,
            msg: "登录成功",
            token
        }))
    }
}


/**
 * @description: 验证用户登录
 * @param {*} ctx
 * @return {*}
 */
const verify = async ctx => {
    let token = ctx.header.authorization
    token = token.replace('Bearer ', '') // 注意'Bearer '后面的空格

    try {
        let res = jwt.verify(token, '2311-server-jwt')

        await Users.findOne({_id: res._id}).then(rel => {
            if (rel) {
                rel.phone = rel.phone.replace(/^(\d{3})\d{4}(\d+)/, "$1****$2")
                ctx.body = {
                    code: 200,
                    msg: "用户认证成功",
                    userInfo: rel
                }
            } else {
                ctx.body = {
                    code: 500,
                    msg: "用户认证失败",
                    data: rel
                }
            }
        }).catch(err => {
            exception(ctx, err)
        })
    } catch (err) {
        exception(ctx, err)
    }
}


/**
 * 在线充值
 * @param ctx
 * @returns {Promise<void>}
 */
const charge = async ctx => {
    let [{_id, chargeValue}, q, price] = [ctx.request.body, null, ctx.request.body.chargeValue];
    if (!_id || !chargeValue) return fail(ctx, null, 400, '未登录或充值金额为空');
    !isNaN(chargeValue) && (chargeValue = Number(chargeValue));

    // 充值满减：充600+送50 充1800+送120 充3000+送280
    if (chargeValue >= 3000) {
        chargeValue += 280
    } else if (chargeValue >= 1800) {
        chargeValue += 120
    } else if (chargeValue >= 600) {
        chargeValue += 50
    }

    // 查找用户并更新余额
    await crud.findOne(ctx, Users, {_id}, rel => (q = rel))

    await crud.update(ctx, Users, {_id}, {
        $set: {
            balance: chargeValue + q.balance,
            updateTime: dtf(Date.now(), "YYYY-MM-DD hh:mm:ss")
        }
    }, rel => responseSelf(ctx, {
        code: rel ? 200 : 300,
        msg: rel ? '支付成功' : '支付失败',
        data: {
            ...rel,
            price,// 支付金额
            _id: q._id,// 订单编号  _id:crypto.randomUUID().slice(2), // 依赖未更新
            receiver: '海健大酒店',// 收款账户
            createTime: dtf(Date.now(), "YYYY-MM-DD hh:mm:ss"),// 下单时间
            payType: '微信支付',// 支付方式
        }
    }))
}


/**
 * 删除用户
 * 将该用户的status设置为delete，限制用户登录
 * @param ctx
 * @returns {Promise<void>}
 */
const del = async ctx => {
    let params = ctx.request.body;

    await crud.update(ctx, Users, {_id: params._id}, {
        $set: {
            status: 'delete',
            updateTime: dtf(Date.now(), "YYYY-MM-DD hh:mm:ss")
        }
    })
}


module.exports = {
    login,
    verify,
    update,
    findAll,
    charge,
    del,
}
