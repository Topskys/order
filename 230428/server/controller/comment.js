const crud = require('./crud')
const UserModel = require('../models/user')
const ProductModel = require('../models/product')
const CommentModel = require('../models/comment')
const { isExpired } = require('../utils/jwt')
const { self, fail } = require('../utils/response')


class Comment {

    async create(ctx) {
        let user, product
        //        const [product_id = '', jt] = [ctx.params.id, await isExpired(ctx)]
        //        if (!product_id) return fail(ctx, undefined, 400, "请求错误")

        //        await crud.findOne(ctx, ProductModel, {_id: product_id}, rel => rel ? (product = rel) : fail(ctx, rel, 400, "评价发布失败"))
        //        jt && await crud.findOne(ctx, UserModel, {_id: jt._id}, rel => rel ? (user = rel) : fail(ctx, rel, 400, "评价发布失败"))
        //        if (user) {
        await crud.add(ctx, CommentModel, {
            ...ctx.request.body,
            //                ...product,
            //                ...user,
        }, rel => {
            self(ctx, {
                code: 200,
                msg: '发布成功',
                data: rel
            })
        })
        //        } else {
        //            fail(ctx, undefined, 400, "发布失败")
        //        }
    }


    async getAll(ctx) {
        const { service = '', content = '' } = ctx.query
        const reg = new RegExp(service || content || '', 'i')
        const where = {
            $or: [
                { service: reg },
                { content: reg },
            ]
        }

        await crud.findByPagination(ctx, CommentModel, ctx.request.query, where)
    }

    async getById(ctx) {
        const { id = '' } = ctx.params
        if (!id) fail(ctx, undefined, 400, "请求参数错误")
        await crud.find(ctx, CommentModel, { product_id: id })
    }

    async delById(ctx) {
        const { id = '' } = ctx.params
        if (!id) fail(ctx, undefined, 400, "请求参数错误")
        await crud.del(ctx, CommentModel, { product_id: id })
    }
}

module.exports = new Comment()