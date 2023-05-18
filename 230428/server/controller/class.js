const ClassModel = require("../models/class")
const { success, self } = require("../utils/response")
const crud = require("./crud")


// 新增分类
const create = async ctx => {
    let flag = false
    const { name = '', poster = '' } = ctx.request.body
    if (!name) return ctx.throw(400, "类名不能为空")
    if (!poster) return ctx.throw(400, "海报不能为空")

    await crud.find(ctx, ClassModel, { name }, function (rel) {
        if (rel && rel.length) {
            flag = false
            return ctx.throw(400, "该类名已存在")
        } else {
            flag = true
        }
    })

    flag && await crud.add(ctx, ClassModel, ctx.request.body)
}


// 删除类别
const del = async ctx => {
    const { id = '' } = ctx.params
    if (!id) return ctx.throw(400, "请求错误")

    id && await crud.del(ctx, ClassModel, { _id: id })
}

// 修改类别
const edit = async ctx => {
    const { id = '' } = ctx.params
    if (!id) return ctx.throw(400, "请求错误")

    id && await crud.update(ctx, ClassModel, { _id: id }, ctx.request.body, rel => {
        rel.modifiedCount > 0 ?
            success(ctx, rel, 200, '修改成功') :
            self(ctx, { code: 200, data: rel, msg: '已修改' })
    })
}

const getById = async ctx => {
    const product_id = ctx.params.id || ''

}

// 获取所有
const getList = async ctx => {
    const { name = '' } = ctx.query
    const where = {
        $or: [
            {
                name: new RegExp(name, 'i')
            }
        ]
    }
    await crud.find(ctx, ClassModel, where)
}

// 获取所有类别(可带参数搜索)
const getAll = async ctx => {
    console.log('getAll------------', ctx)
    const { name = '' } = ctx.query
    await crud.findByPagination(ctx, ClassModel, ctx.request.query, {
        $or: [
            { name: new RegExp(name, 'i') },
        ]
    })
}


module.exports = { create, del, edit, getById, getAll, getList }