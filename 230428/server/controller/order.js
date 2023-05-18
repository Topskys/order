const crud = require("./crud")
const OrderModel = require("../models/order")
const UserModel = require('../models/user')
const StaffModel = require('../models/staff')
const ProductModel = require('../models/product')
const { isExpired } = require('../utils/jwt')
const { fail } = require('../utils/response')


class Order {

    // 加入维修预购订单
    async create(ctx) {
        let user, product
        const { product_id = '' } = ctx.request.body
        if (!product_id) return fail(ctx, undefined, 400, "请求错误")

        await crud.findOne(ctx, ProductModel, { _id: product_id }, rel => rel ? (product = rel) : fail(ctx, rel, 400, "操作失败"))
        await crud.findOne(ctx, UserModel, { _id: (await isExpired(ctx))._id.toString() }, rel => rel ? (user = rel) : fail(ctx, rel, 400, "操作失败"))

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
        const { id = '' } = ctx.params
        if (!id) return ctx.throw(400, "请求错误")

        await crud.findOne(ctx, OrderModel, { _id: id }, rel => (rel && (order = rel)))
        order && await crud.del(ctx, OrderModel, { _id: id })
    }


    // 模拟支付
    async pay(ctx) {
        let order, user
        const { id = '' } = ctx.params
        const { disc_id = '' } = ctx.request.body
        if (!id) return fail(ctx, undefined, 400, "请求错误")

        await crud.findOne(ctx, OrderModel, { _id: id }, rel => (rel ? (order = rel) : fail(ctx, undefined, 400, "支付失败")))

        await crud.findOne(ctx, UserModel, { _id: (await isExpired(ctx))._id.toString() }, rel => (rel ? (user = rel) : fail(ctx, undefined, 400, "支付失败")))


        let flag = false
        const pay_token = Buffer.from(JSON.stringify({
            ...order,
            ...ctx.request.body,
            status: '待上门'
        })).toString("base64")
        await crud.update(ctx, OrderModel, { _id: id }, { ...ctx.request.body, pay_token }, function (rel) {
            if (rel.modifiedCount) {
                flag = true
            } else {
                flag = false
                fail(ctx, rel, 400, "支付失败")
            }
        })

        const arr = user.discount || []
        const list = []
        if (disc_id && arr.length) {
            arr.forEach(item => item._id.toString() != disc_id && list.push(item))
        }

        flag ? await crud.update(ctx, UserModel, {
            _id: (await isExpired(ctx))._id.toString()
        }, {
            $set: {
                discount: list
            }
        }, rel => {
            if (rel.modifiedCount) {
                ctx.body = {
                    code: 200,
                    msg: '支付成功',
                    pay_token,
                }
            } else {
                fail(ctx, rel, 400, "支付失败")
            }
        }) : fail(ctx, rel, 400, "支付失败")
    }

    // 修改预购维修订单状态信息
    async setWorker(ctx) {
        const { id = '' } = ctx.params
        const { worker = '' } = ctx.request.body
        const arr = worker.split(":")
        const [w_name, w_id] = [arr[0], arr[1]]
        if (!id || !w_name || !w_id) return fail(ctx, undefined, 400, "请求错误")

        await crud.update(ctx, StaffModel, { _id: w_id }, {
            $set: {
                is_busy: true
            }
        })

        await crud.update(ctx, OrderModel, { _id: id }, {
            $set: {
                worker: w_name,
                worker_id: w_id,
                status: "服务中"
            }
        }, rel => {
            ctx.body = {
                code: 200,
                msg: "派遣成功",
                data: rel
            }
        })
    }


    // 完成服务，释放维修员为空闲
    async over(ctx) {
        const { id = '' } = ctx.params
        const { worker_id = '' } = ctx.request.body
        if (!id || !worker_id) return fail(ctx, undefined, 400, "请求错误")

        await crud.update(ctx, StaffModel, { _id: worker_id }, {
            $set: {
                is_busy: false
            }
        })

        await crud.update(ctx, OrderModel, { _id: id }, {
            $set: {
                status: "完成"
            }
        }, rel => {
            ctx.body = {
                code: 200,
                msg: "订单已完成",
                data: rel
            }
        })
    }


    // 用户点击订单完成按钮
    async servicing(ctx) {
        const { id = '' } = ctx.params
        const { worker_id = '' } = ctx.request.body
        if (!id || !worker_id) return fail(ctx, undefined, 400, "请求错误")

        await crud.update(ctx, StaffModel, { _id: worker_id }, {
            $set: {
                is_busy: false
            }
        })

        await crud.update(ctx, OrderModel, { _id: id }, {
            $set: {
                status: "待评价"
            }
        }, rel => {
            ctx.body = {
                code: 200,
                msg: "请对本次服务作评价",
                data: rel
            }
        })
    }


    // 获取预购订单信息
    async getById(ctx) {
        const { id = '' } = ctx.params
        if (!id) return fail(ctx, undefined, 400, "请求错误")
        await crud.findOne(ctx, OrderModel, { _id: id })
    }


    // 获取所有预购维修订单商品，支持带参数查询
    async getAll(ctx) {
        const { keyword = '' } = ctx.query
        const where = {
            $or: [
                { status: new RegExp(keyword, 'i') },
                { title: new RegExp(keyword, 'i') },
                { nickName: new RegExp(keyword, 'i') }
            ]
        }
        await crud.findByPagination(ctx, OrderModel, ctx.request.query, where)
    }


}

module.exports = new Order()