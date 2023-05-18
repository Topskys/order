const crud = require('./crud')
const ProductModel = require('../models/product')
const { isExpired } = require('../utils/jwt')
const { success, self, fail, exception } = require('../utils/response')


class Product {

    // 新增维修产品
    async create(ctx) {
        let flag = false
        const { title = '', poster = '', class_name = '' } = ctx.request.body
        if (!title || !poster || !class_name) {
            fail(ctx, undefined, 400, "请求参数错误")
            return
        }

        const data = {
            ...ctx.request.body,
            class_name: class_name.split(":")[0],
            class_id: class_name.split(":")[1],
        }

        await crud.find(ctx, ProductModel, { title }, rel => {
            rel && rel.length ? fail(ctx, undefined, 400, "该标题已存在") : (flag = true)
        })

        flag ? await crud.add(ctx, ProductModel, data) : fail(ctx, undefined, 400, "添加失败")
    }

    async del(ctx) {
        const { id = '' } = ctx.params
        id ? await crud.del(ctx, ProductModel, { _id: id }) : ctx.throw(400, "删除失败")
    }

    async update(ctx) {
        let pro = false
        const { id = '' } = ctx.params
        const { title = '', poster = '', class_id = '' } = ctx.request.body
        if (!title || !poster || !class_id) fail(ctx, undefined, 400, "请求参数错误")

        await crud.findOne(ctx, ProductModel, { _id:id }, rel => rel ? (pro = rel) : fail(ctx, undefined, 400, "该商品不存在"))
        pro ? await crud.update(ctx, ProductModel, { _id: id }, {
            ...ctx.request.body,
            selections:[...pro.selections],
        }) : ctx.throw(400, "更新失败")
    }


    async getAll(ctx) {
        const { class_name = '', title = '', startAt = '', endAt = '' } = ctx.query
        const keyword = class_name || title
        const reg = new RegExp(keyword, 'i')
        const where = {
            $or: [
                { title: reg },
                { class_name: reg },
            ]
        }
        // // 将查询条件GMT换算成时间戳，dataTime ∈ [startAt,endAt]
        // const where = (startAt && endAt) ? {
        //     dateTime: {
        //         $gt: new Date(startAt).getTime(),
        //         $lt: new Date(endAt).getTime()
        //     }
        // } : {}

        await crud.findByPagination(ctx, ProductModel, ctx.request.query, where)
    }

    async getById(ctx) {
        const { id = '' } = ctx.params
        if (!id) fail(ctx, undefined, 400, "请求参数错误")

        await crud.findOne(ctx, ProductModel, { _id: id })
    }


    // 新增服务选择项
    async addSer(ctx) {
        let product
        const product_id = ctx.params.id
        const { service = '', price = '' } = ctx.request.body
        if (!service || !price || !product_id) {
            fail(ctx, undefined, 400, "请求参数错误")
            return
        }

        await crud.findOne(ctx, ProductModel, { _id: product_id }, rel => {
            rel ? (product = rel) : (product.selections = [])
        })

        await crud.update(ctx, ProductModel, {
            _id: product_id,
        }, {
            $set: {
                selections: [...product.selections, {
                    service,
                    price
                }]
            }
        }, rel => {
            ctx.body = {
                code: 200,
                msg: "添加成功",
                data: rel
            }
        })
    }


    // 删除服务项
    async delSer(ctx) {
        let product
        const product_id = ctx.params.id
        const { service = '', index } = ctx.request.body
        if (index < 0 || !product_id) {
            fail(ctx, undefined, 400, "请求参数错误")
            return
        }

        await crud.findOne(ctx, ProductModel, { _id: product_id }, rel => (product = rel))

        await crud.update(ctx, ProductModel, {
            _id: product_id,
        }, {
            $set: {
                selections: product.selections.splice(Number(index), 1)
            }
        }, rel => {
            if (rel.modifiedCount) {
                ctx.body = {
                    code: 200,
                    msg: '成功删除',
                }
            } else {
                fail(ctx, rel, 400, "删除失败")
            }
        })
    }


    // 获取所有服务项
    async getSerById(ctx) {
        const product_id = ctx.params.id
        if (!product_id) fail(ctx, undefined, 400, "请求参数错误")

        await crud.findOne(ctx, ProductModel, { _id: product_id }, rel => {
            ctx.body = {
                code: 200,
                msg: "查询成功",
                data: rel.selections || []
            }
        })
    }

    // 更新服务项
    async updateSer(ctx) {

    }
}


module.exports = new Product()