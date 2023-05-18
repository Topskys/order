const { find, findOne, findByPagination, add, del, update } = require('./crud')
const OrderModel = require('../models/order')
const UserModel = require('../models/user')
const { isExpired } = require('../utils/jwt')
const { success, self, fail } = require('../utils/response')


// 取消或删除订单
async function delOrder(ctx) {
    await del(ctx, OrderModel, { _id: ctx.params.id }, rel => {
        ctx.body = {
            code: 200,
            msg: '取消成功',
            data: rel
        }
    })
}


// 获取订单列表
async function getAll(ctx) {
    const { keyword = '' } = ctx.query
    await findByPagination(ctx, OrderModel, ctx.request.query, {
        $or: [
            { title: new RegExp(keyword, 'i') },
            { nickName: new RegExp(keyword, 'i') }
        ]
    })
}


// 查询订单
const getOrderById = async (ctx) => {
    const { id = '' } = ctx.params
    if (!id) {
        fail(ctx, undefined, 400, "请求失败")
        return
    }

    await findOne(ctx, OrderModel, { _id: id }, function (rel) {
        if (rel) {
            self(ctx, {
                code: 200,
                msg: '成功',
                data: rel
            })
        }
    })
}


// 新增订单
async function createOrder(ctx) {
    const {
        service = '',
        title = '',
        poster = '',
        address = '',
        origin_price = '',
        product_id = '',
        user_id = ''
    } = ctx.request.body
    if (!service || !title || !poster || !origin_price || !product_id || !user_id) {
        fail(ctx, null, 400, "请求失败")
        return
    }
    if (!address) {
        fail(ctx, undefind, 400, "请填写地址信息")
        return
    }

    await add(ctx, OrderModel, { ...ctx.request.body, actual_price: 0 }, rel => {
        if (rel) {
            self(ctx, {
                code: 200,
                msg: '成功加入预约订单',
                data: rel
            })
        }
    })
}


// 支付订单
async function payOrder(ctx) {
    const { id = '' } = ctx.params
    if (!id) return fail(ctx, undefined, 400, "请求失败")

    // 在此做支付操作（常规需要企业级认证开发者，才能使用支付接口）
    await update(ctx, OrderModel, { _id: id }, {
        $set: {
            ...ctx.request.body,
            // status: "进行中"
        }
    }, rel => {
        console.log(rel);
        if (rel && rel.modifiedCount > 0) {
            ctx.body = {
                code: 200,
                data: rel,
                msg: "支付成功",
                pay_token: Buffer.from(Date.now()).toString('base64')
            }
        } else {
            ctx.body = {
                code: 400,
                data: rel,
                msg: "支付失败"
            }
        }
    })
}

// 更新订单状态信息
async function updateOrder(ctx) {
    const [{ id = '' }, body] = [ctx.params, ctx.request.body]
    let order
    await findOne(ctx, OrderModel, { _id: id }, function (rel) {
        if (rel) {
            order = rel
        } else {
            return fail(ctx, undefined, 400, "请求失败")
        }
    })

    if (body) {
        const { status } = body

    }
    await update(ctx, OrderModel, { _id: id }, body)
}


module.exports = { getAll, getOrderById, delOrder, payOrder, createOrder }