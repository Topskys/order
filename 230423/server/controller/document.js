const crud = require('../controller/crud')
const DocumentModel = require('../models/document')
const {isExpired, createToken} = require('../utils/jwt')
const {self, fail, exception} = require('../utils/response')

class Document {

//  后台分页获取文档  
    async getAll(ctx) {
        const {keyword = '', startAt = '', endAt = ''} = ctx.query
        const regex = new RegExp(keyword, 'i')
        let where = {}
        if (startAt && endAt) {
            where = {
                dateTime: {
                    $gt: new Date(startAt).getTime(),
                    $lt: new Date(endAt).getTime()
                }
            }
        } else {
            where = {
                $or: [
                    {filename: regex}
                ]
            }
        }
        await crud.findByPagination(ctx, DocumentModel, ctx.request.query, where)
    }


    // 用户新增云端文档
    async create(ctx) {
        let flag = false
        const {filename} = ctx.request.body
        await crud.findOne(ctx, DocumentModel, {filename}, rel => {
            rel?.filename ? ctx.throw(400, '相同的文件名已存在') : (flag = true)
        })
        flag && await crud.add(ctx, DocumentModel, ctx.request.body)
    }


    // 删除云端文档
    async remove(ctx) {
        let temp
        const {_id} = ctx.params
        await crud.findOne(ctx, DocumentModel, {_id}, rel => {
            rel ? (temp = rel) : fail(ctx, undefined, 400, "该文档尚未存在")
        })
        temp && await crud.del(ctx, DocumentModel, {_id})
    }

    // 用户修改更新云端文档
    async edit(ctx) {
        let temp
        const {_id} = ctx.params
        await crud.findOne(ctx, DocumentModel, {_id}, rel => {
            rel ? (temp = rel) : fail(ctx, undefined, 400, "该文档尚未存在")
        })
        temp && await crud.update(ctx, DocumentModel, {_id}, ctx.request.body)
    }


    // 用户获取云端文件
    async getDocsById(ctx) {
        const res = await isExpired(ctx)
        await crud.find(ctx, DocumentModel, {userId: res._id})
    }

}


module.exports = new Document()
