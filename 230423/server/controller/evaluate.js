const EvaluateModel = require("../models/evalute")
const UserModel = require("../models/user")
const {isExpired} = require("../utils/jwt")
const {add, del, update, find, findOne, findByPagination} = require("./crud")
const {fail, self, success, exception} = require("../utils/response")


// 发布评论
const addEvaluate = async ctx => {
    const {id = ''} = ctx.params
    const {content = ''} = ctx.request.body
    if (!id) fail(ctx, null, 400, "请求失败")
    if (!content) return ctx.throw(400, "评价内容不能为空")

    let user
    await findOne(ctx, UserModel, {_id: (await isExpired(ctx))._id}, function (rel) {
        if (rel) {
            user = rel
        } else {
            return fail(ctx, undefined, 400, "发布评价失败")
        }
    })

    await add(ctx, EvaluateModel, {
        ...ctx.request.body,
        ...user,
        user_id: user._id,
    })
}


// 获取所有评价(可带参数搜索)
const getAll = async ctx => {
    const {keyword = ''} = ctx.query
    await find(ctx, EvaluateModel, {
        $or: [
            {
                content: new RegExp(keyword, 'i')
            }
        ]
    })
}


// 通过商品_id获取评论
const getEvaluateById = async ctx => await find(ctx, EvaluateModel, {product_id: ctx.params.id})


module.exports = {addEvaluate, getAll, getEvaluateById}