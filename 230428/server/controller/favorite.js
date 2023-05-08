const crud = require('./crud')
const UserModel = require('../models/user')
const ProductModel = require('../models/product')
const FavoriteModel = require('../models/like')
const {isExpired} = require('../utils/jwt')
const {success, self, fail} = require('../utils/response')


class Favorite {

    async create(ctx) {
        let user, product
        const [product_id = '', jt] = [ctx.params.id, await isExpired(ctx)]
        if (!product_id) return fail(ctx, undefined, 400, "请求错误")

        await crud.findOne(ctx, ProductModel, {_id: product_id}, rel => rel ? (product = rel) : fail(ctx, rel, 400, "关注失败"))
        jt._id && await crud.findOne(ctx, UserModel, {_id: jt._id}, rel => rel ? (user = rel) : fail(ctx, rel, 400, "关注失败"))
        if (user) {
            const params = {
                ...ctx.request.body,
                ...product,
                ...user,
            }
            await crud.add(ctx, FavoriteModel, params, rel => {
                ctx.body = {
                    code: 200,
                    msg: '已成功关注',
                    data: rel
                }
            })
        } else {
            fail(ctx, undefined, 400, "关注失败")
        }
    }


    async cancel(ctx) {
        await crud.del(ctx, FavoriteModel, {_id: ctx.params.id}, rel => {
            ctx.body = {
                code: 200,
                msg: '取消成功',
                data: rel
            }
        })
    }


    async getAll(ctx) {
        const {keyword = ''} = ctx.query
        const where = {
            $or: [
                {title: new RegExp(keyword, 'i')}
            ]
        }

        await crud.findByPagination(ctx, FavoriteModel, ctx.request.query, where)
    }
}

module.exports = new Favorite()