const crud = require('./crud')
const FeedbackModel = require("../models/feedback.js")

const create = async ctx => await crud.add(ctx, FeedbackModel, ctx.request.body)

const remove = async ctx => await crud.del(ctx, FeedbackModel, {_id: ctx.params.id})

const getAll = async ctx => {
    const {keyword = ''} = ctx.query
    const regex = new RegExp(keyword, 'i')
    const where = {
        $or: [
            {subject: regex},
            {contact: regex},
        ]
    }
    await crud.findByPagination(ctx, FeedbackModel, ctx.request.query, where)
}

module.exports = {create, remove, getAll}