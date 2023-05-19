const crud = require('./crud')
const UserModel = require('../models/user')
const ProductModel = require('../models/product')
const FavoriteModel = require('../models/collection')
const { isExpired } = require('../utils/jwt')
const { success, self, fail } = require('../utils/response')


async function create(ctx) {
    let user, product, flag = false
    const [{ product_id = '' }, jt] = [ctx.request.body, await isExpired(ctx)]
    if (!product_id) return fail(ctx, undefined, 400, "请求失败")

    await crud.find(ctx, FavoriteModel, { product_id }, rel => {
        if (rel && rel.length) {
            ctx.body = {
                code: 200,
                msg: '已收藏'
            }
            flag = true
        }
    })

    if (flag) return

    await crud.findOne(ctx, ProductModel, { _id: product_id }, rel => rel ? (product = rel) : fail(ctx, rel, 400, "收藏失败"))
    jt._id && await crud.findOne(ctx, UserModel, { _id: jt._id }, rel => rel ? (user = rel) : fail(ctx, rel, 400, "收藏失败"))
    if (user) {
        const params = {
            ...ctx.request.body,
            user_id: user._id,
            nickName: user.nickName,
        }
        await crud.add(ctx, FavoriteModel, params, rel => {
            ctx.body = {
                code: 200,
                msg: '已成功收藏',
                data: rel
            }
        })
    } else {
        fail(ctx, undefined, 400, "收藏失败")
    }
}


async function del(ctx) {
    await crud.del(ctx, FavoriteModel, { _id: ctx.params.id }, rel => {
        ctx.body = {
            code: 200,
            msg: '取消成功',
            data: rel
        }
    })
}


async function getAll(ctx) {
    const { keyword = '' } = ctx.query
    await crud.findByPagination(ctx, FavoriteModel, ctx.request.query, {
        $or: [
            { title: new RegExp(keyword, 'i') }
        ]
    })
}

async function getById(ctx) {
    const { id = '' } = ctx.params
    await crud.find(ctx, FavoriteModel, { user_id: id })
}


module.exports = { create, del, getAll, getById }