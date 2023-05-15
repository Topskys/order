const crud = require("./crud")
const OrderModel = require("../models/order")
const UserModel = require('../models/user')
const ProductModel = require('../models/product')
const {isExpired} = require('../utils/jwt')
const {fail} = require('../utils/response')


class Order {

    // 加入维修预购订单
    async create(ctx) {
        let user, product
        const {product_id = ''} = ctx.request.body
        if (!product_id) return fail(ctx, undefined, 400, "请求错误")

        await crud.findOne(ctx, ProductModel, {_id: product_id}, rel => rel ? (product = rel) : fail(ctx, rel, 400, "操作失败"))
        await crud.findOne(ctx, UserModel, {_id: (await isExpired(ctx))._id.toString()}, rel => rel ? (user = rel) : fail(ctx, rel, 400, "操作失败"))

        const data = {
            ...ctx.request.body,
            title: product.title,
            poster: product.poster,
            status: "待付款",
            user_id: user._id.toString(),
            nickName: user.nickName,
            phone: user.phone,
            address: user.address,
        }

        await crud.add(ctx, OrderModel, data, rel => {
            ctx.body = {
                code: 200,
                msg: '已成功接入预购订单',
                data: rel
            }
        })
    }


    async del(ctx) {
        let order
        const {id = ''} = ctx.params
        if (!id) return ctx.throw(400, "请求错误")

        await crud.findOne(ctx, OrderModel, {_id: id}, rel => (rel && (order = rel)))
        order && await crud.del(ctx, OrderModel, {_id: id})
    }


    async pay(ctx) {
        let order
        const {id = ''} = ctx.params
        if (!id) return fail(ctx, undefined, 400, "请求错误")

        await crud.findOne(ctx, OrderModel, {_id: id}, rel => (rel ? (order = rel) : fail(ctx, undefined, 400, "支付失败")))

        const data = {
            ...order,
            ...ctx.request.body,
            status: '待上门'
        }

        await crud.update(ctx, OrderModel, {_id: id}, data, function (rel) {
            if (rel.modifiedCount > 0) {
                ctx.body = {
                    code: 200,
                    msg: '支付成功',
                    pay_token: Buffer.from(JOSN.strigfy(data)).toString("base64"),
                }
            } else {
                fail(ctx, rel, 400, "支付失败")
            }
        })
    }

    // 修改预购维修订单状态信息
    async edit(ctx) {
        let order
        const [{id = ''}, {body}] = [ctx.params, ctx.request]
        if (!id) return fail(ctx, undefined, 400, "请求错误")

        await crud.findOne(ctx, OrderModel, {_id: id}, function (rel) {
            rel ? (order = rel) : fail(ctx, rel, 400, "")
        })
        const opts = [
            {
                status: "服务中",
                cb: (data) => {

                }
            }
        ]


        const params = {
            ...ctx.request.body,
        }
        id && await crud.update(ctx, OrderModel, {_id: id}, params)
    }

    // 获取预购订单信息
    async getById(ctx) {
        const {id = ''} = ctx.params
        if (!id) return fail(ctx, undefined, 400, "请求错误")
        await crud.findOne(ctx, OrderModel, {_id: id})
    }


    // 获取所有预购维修订单商品，支持带参数查询
    async getAll(ctx) {
        const {keyword = ''} = ctx.query
        const where = {
            $or: [
                {status: new RegExp(keyword, 'i')},
                {title: new RegExp(keyword, 'i')},
                {nickName: new RegExp(keyword, 'i')}
            ]
        }
        await crud.findByPagination(ctx, OrderModel, ctx.request.query, where)
    }


}

module.exports = new Order()