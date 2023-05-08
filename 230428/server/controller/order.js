const OrderModel = require("../models/order")
const crud = require("./crud")
const {fail} = require("../utils/response")


class Order {

    async createOrder(ctx) {

        await crud.add(ctx, OrderModel, ctx.request.body)
    }


    async delOrder(ctx) {
        let order
        const {id = ''} = ctx.params
        if (!id) return ctx.throw(400, "请求错误")

        await crud.findOne(ctx, OrderModel, {_id: id}, rel => (rel && (order = rel)))
        order && await crud.del(ctx, OrderModel, {_id: id})
    }


    async payOrder(ctx) {
        let order
        const {id = ''} = ctx.params
        if (!id) return ctx.throw(400, "请求错误")

        await crud.findOne(ctx, OrderModel, {_id: id}, rel => (rel ? (order = rel) : ctx.throw(400, "支付失败")))
        const params = {
            ...order,
            ...ctx.request.body,
            status:'带上门'
        }
        order ? await crud.update(ctx, OrderModel, {_id: id}, params, function (rel) {
            if (rel.modifiedCount > 0) {
                ctx.body = {
                    code: 200,
                    msg: '支付成功',
                }
            } else {
                fail(ctx, rel, 400, "支付失败")
            }
        }) : fail(ctx, order, 400, "支付失败")
    }


    async editOrder(ctx) {
        const {id = ''} = ctx.params
        if (!id) return ctx.throw(400, "请求错误")

        const params = {
            ...ctx.request.body,
        }
        id && await crud.update(ctx, OrderModel, {_id: id}, params)
    }
    

}