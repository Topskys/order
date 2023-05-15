const crud = require('./crud')
const UserModel = require('../models/user')
const ProductModel = require('../models/product')
const FavoriteModel = require('../models/favorite')
const { isExpired } = require('../utils/jwt')
const { fail } = require('../utils/response')

// 关注
class Favorite {

    // 取消或关注商品
    async addOrDel(ctx) {
        let user, product, isLike
        const product_id = ctx.params.id
        if (!product_id) return fail(ctx, undefined, 400, "请求错误")

        await crud.findOne(ctx, FavoriteModel, { product_id: product_id }, rel => (isLike = rel ? rel : false))
        await crud.findOne(ctx, ProductModel, { _id: product_id }, rel => rel ? (product = rel) : fail(ctx, rel, 400, "操作失败"))
        await crud.findOne(ctx, UserModel, { _id: (await isExpired(ctx))._id.toString() }, rel => rel ? (user = rel) : fail(ctx, rel, 400, "操作失败"))

        const data = {
            ...ctx.request.body,
            product_id: product_id,
            title: product.title,
            description: product.description,
            poster: product.poster,
            start_price: product.start_price,
            user_id: user._id.toString(),
            nickName: user.nickName,
        }

        const backMsg = (data, msg) => {
            ctx.body = {
                code: 200,
                msg: msg,
            }
        }

        isLike ?
            await crud.del(ctx, FavoriteModel, { _id: ctx.params.id }, rel => backMsg(rel, '取消成功'))
            : await crud.add(ctx, FavoriteModel, data, rel => backMsg(rel, '已成功关注'))
    }

    // 获取所有关注商品
    async getAll(ctx) {
        const { keyword = '' } = ctx.query
        const where = {
            $or: [
                { title: new RegExp(keyword, 'i') },
                { nickName: new RegExp(keyword, 'i') }
            ]
        }
        await crud.findByPagination(ctx, FavoriteModel, ctx.request.query, where)
    }


    // 查找用户关注的商品
    async getById(ctx) {
        await crud.findOne(ctx, FavoriteModel, { product_id: ctx.params.id }, rel => {
            ctx.body = {
                code: 200,
                msg: '成功',
                data: rel || {}
            }
        });
    }

}

module.exports = new Favorite()