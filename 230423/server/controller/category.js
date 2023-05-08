const CateModel = require("../models/category")
const {add, del, update, find, findByPagination} = require("./crud")
const {fail, self, success, exception} = require("../utils/response")


// 新增分类
const createCate = async ctx => {
    let flag = false
    const {title = ''} = ctx.request.body
    if (!title) return ctx.throw(400, "分类名称不能为空")

    await find(ctx, CateModel, {title}, function (rel) {
        if (rel && rel.length) {
            flag = false
            return ctx.throw(400, "该分类名称已存在")
        } else {
            flag = true
        }
    })

    flag && await add(ctx, CateModel, ctx.request.body)
}


// 删除分类
const delCate = async ctx => await del(ctx, CateModel, {_id: ctx.params.id})


// 修改分类
const updateCate = async ctx => {
    const {id = ''} = ctx.params
    if (!id) return ctx.throw(400, "请求失败")

    id && await update(ctx, CateModel, {_id: id}, ctx.request.body, rel => {
        rel.modifiedCount > 0 ?
            success(ctx, rel, 200, '修改成功') :
            self(ctx, {code: 200, data: rel, msg: '已修改'})
    })
}


// 获取所有分类(可带参数搜索)
const getCateList = async ctx => {
    const {keyword = ''} = ctx.query
    await find(ctx, CateModel, {
        $or: [
            {
                title: new RegExp(keyword, 'i')
            }
        ]
    })
}


module.exports = {createCate, delCate, updateCate, getCateList}