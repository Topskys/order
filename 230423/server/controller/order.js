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
            { phone: new RegExp(keyword, 'i') },
            { employee_name: new RegExp(keyword, 'i') }
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
        employee_name = '',
        poster = '',
        address = '',
        origin_price = '',
        product_id = '',
        user_id = ''
    } = ctx.request.body
    if (!service || !employee_name || !poster || !origin_price || !product_id || !user_id) {
        fail(ctx, null, 400, "请求失败")
        return
    }
    if (!address) {
        fail(ctx, undefined, 400, "请填写地址信息")
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
    console.log('-------', ctx.request.body)
    await update(ctx, OrderModel, { _id: id }, {
        $set: {
            ...ctx.request.body,
            status: "进行中"
        }
    }, rel => {
        if (rel && rel.modifiedCount > 0) {
            ctx.body = {
                code: 200,
                data: rel,
                msg: "支付成功",
                pay_token: Date.now()
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

// 更新订单状态信息（停用）
async function updateOrder(ctx) {
    const [{ id = '' }, body] = [ctx.params, ctx.request.body]
    await update(ctx, OrderModel, { _id: id }, body)
}

// 修改订单信息
async function editOrder(ctx) {
    const { id = '' } = ctx.params
    await update(ctx, OrderModel, { 
        _id: id 
    }, ctx.request.body)
}


module.exports = { getAll, getOrderById,editOrder, delOrder, payOrder, createOrder }