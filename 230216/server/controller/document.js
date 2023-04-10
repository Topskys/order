const crud = require('../controller/crud')
const DocumentModel = require('../models/document')
const {isExpired, createToken} = require('../utils/jwt')
const {self, fail, exception} = require('../utils/response')

class Document {

    async getAll(ctx) {
        const {keyword = '', startAt = '', endAt = ''} = ctx.query
        const regex = new RegExp(keyword, 'i')
//        const where = {
//            $or: [
//                {filename: regex},
//                {
//                    dateTime: {
//                        $gt: new Date(startAt).getTime(),
//                        $lt: new Date(endAt).getTime()
//                    }
//                },
//            ]
//        }
        let where={}
        if(startAt && endAt){
           where= {
                dateTime: {
                    $gt: new Date(startAt).getTime(),
                    $lt: new Date(endAt).getTime()
                }
            }
        }else{
            where={
                $or: [
                    {filename: regex}
                ]
            }
        }
        await crud.findByPagination(ctx, DocumentModel, ctx.request.query, where)
    }


    async create(ctx) {
        let temp = []
        const {username} = ctx.request.body
        await crud.find(ctx, DocumentModel, {username}, rel => {
            (rel && rel.length > 0) ? (temp = rel) : fail(ctx, undefined, 400, "该邮箱已注册")
        })
        temp.length && await crud.add(ctx, DocumentModel, ctx.request.body)
    }


    async remove(ctx) {
        let temp
        const {_id} = ctx.params
        await crud.findOne(ctx, DocumentModel, {_id}, rel => {
            rel ? (temp = rel) : fail(ctx, undefined, 400, "该文档尚未存在")
        })
        temp && await crud.del(ctx, DocumentModel, {_id})
    }

    async edit(ctx) {
        let temp
        const {_id} = ctx.params
        await crud.findOne(ctx, DocumentModel, {_id}, rel => {
            rel ? (temp = rel) : fail(ctx, undefined, 400, "该文档尚未存在")
        })
        temp && await crud.update(ctx, DocumentModel, {_id}, ctx.request.body)
    }

}


module.exports = new Document()
