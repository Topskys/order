//const crud = require('./crud')
//const DeatilModel = require('../models/detail')
//const {success, self, fail, exception} = require('../utils/response')
//
//
//class Deatil {
//
//    async create(ctx) {
//        let flag = false
//        const {id = ''} = ctx.params
//        const {title = '',} = ctx.request.body
//        if (!title) fail(ctx, undefined, 400, "请求参数错误")
//
//        await crud.find(ctx, DetailModel, {product_id: id}, rel => {
//            if (rel && rel.length) {
//                fail(ctx, undefined, 400, "该商品详情已存在")
//            } else {
//                flag = true
//            }
//        })
//
//        flag && await crud.add(ctx, DetailModel, ctx.request.body)
//    }
//
//    async del(ctx) {
//        const {id = ''} = ctx.params
//        id ? await crud.del(ctx, DetailModel, {_id: id}) : ctx.throw(400, "删除失败")
//    }
//
//    async update(ctx) {
//        let det = false
//        const {id = ''} = ctx.params
//        const {title = ''} = ctx.request.body
//        if (!title) fail(ctx, undefined, 400, "请求参数错误")
//
//        await crud.findOne(ctx, DetailModel, {_id: id}, rel => rel ? (det = rel) : fail(ctx, undefined, 400, "该商品详情不存在"))
//        det ? await crud.update(ctx, DetailModel, {_id: det._id}, ctx.request.body) : ctx.throw(400, "更新失败")
//    }
//
//
//    async getAll(ctx) {
//        const {keyword = ''} = ctx.query
//        const regex = new RegExp(keyword, 'i')
//        const where = {
//            $or: [
//                {title: regex},
//            ]
//        }
//        await crud.findByPagination(ctx, DetailModel, ctx.request.query, where)
//    }
//
//
//    async getById(ctx) {
//        const {id = ''} = ctx.params
//        if (!id) fail(ctx, undefined, 400, "请求参数错误")
//
//        await crud.findOne(ctx, DeatilModel, {_id: id})
//    }
//
//}
//
//
//module.exports = new Deatil()