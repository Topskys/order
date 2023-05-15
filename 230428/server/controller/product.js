const crud = require('./crud')
const ProductModel = require('../models/product')
const {isExpired} = require('../utils/jwt')
const {success, self, fail, exception} = require('../utils/response')


class Product {

    async create(ctx) {
        let flag = false
        const {title = '', poster = '', class_id = ''} = ctx.request.body
        if (!title || !poster || !class_id) {
            fail(ctx, undefined, 400, "请求参数错误")
            return
        }

        await crud.find(ctx, ProductModel, {title}, rel => {
            rel && rel.length ? fail(ctx, undefined, 400, "该名称已存在") : (flag = true)
        })

        flag && await crud.add(ctx, ProductModel, ctx.request.body)
    }

    async del(ctx) {
        const {id = ''} = ctx.params
        id ? await crud.del(ctx, ProductModel, {_id: id}) : ctx.throw(400, "删除失败")
    }

    async update(ctx) {
        let pro = false
        const {id = ''} = ctx.params
        const {title = '', poster = '', class_id = ''} = ctx.request.body
        if (!title || !poster || !class_id) fail(ctx, undefined, 400, "请求参数错误")

        await crud.findOne(ctx, ProductModel, {title}, rel => rel ? (pro = rel) : fail(ctx, undefined, 400, "该商品不存在"))
        pro ? await crud.update(ctx, ProductModel, {_id: id}, ctx.request.body) : ctx.throw(400, "更新失败")
    }


    async getAll(ctx) {
        const {keyword = ''} = ctx.query
        const regex = new RegExp(keyword, 'i')
        const where = {
            $or: [
                {title: regex},
                {class_id: regex},
            ]
        }
        await crud.findByPagination(ctx, ProductModel, ctx.request.query, where)
    }

    async getById(ctx) {
        const {id = ''} = ctx.params
        if (!id) fail(ctx, undefined, 400, "请求参数错误")

        await crud.findOne(ctx, ProductModel, {_id: id})
    }

}


module.exports = new Product()