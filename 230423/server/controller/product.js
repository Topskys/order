const crud = require('./crud')
const ProductModel = require('../models/product')
const EvaluteModel = require("../models/evalute")
const {success, self, fail} = require('../utils/response')


const addProduct = async (ctx) => {
    let flag = false
    const {title = '', poster = '', cate_id = ''} = ctx.request.body
    if (!title || !poster || !cate_id) fail(ctx, undefined, 400, "请求失败")

    await crud.find(ctx, ProductModel, {title: title}, function (rel) {
        if (rel && rel.length) {
            return fail(ctx, undefined, 400, "该名称已存在")
        } else {
            flag = true
        }
    })

    flag && await crud.add(ctx, ProductModel, ctx.request.body)
}


const delProduct = async ctx => await crud.del(ctx, ProductModel, {_id: ctx.params.id})


const updateProduct = async (ctx) => {
    let product
    const {id = ''} = ctx.params
    const {title = '', poster = '', cate_id = ''} = ctx.request.body
    if (!title || !poster || !cate_id) {
        return fail(ctx, undefined, 400, "请求参数错误")
    }

    await crud.findOne(ctx, ProductModel, {title}, rel => rel ? (product = rel) : fail(ctx, undefined, 400, "该商品不存在"))
    if (product) {
        await crud.update(ctx, ProductModel, {_id: id}, ctx.request.body, function (rel) {
            if (rel && rel.modifiedCount > 0) {
                return success(ctx, rel, undefined, "修改成功")
            } else {
                return self(ctx, {
                    code: 200,
                    data: rel,
                    msg: "已修改"
                })
            }
        })
    }
}


const getAll = async (ctx) => {
    const {keyword = ''} = ctx.query
    const regex = new RegExp(keyword, 'i')
    await crud.findByPagination(ctx, ProductModel, ctx.request.query, {
        $or: [
            {title: regex},
            {location: regex},
            {cate_id: regex},
        ]
    })
}


const getProductById = async (ctx) => {
    const {id = ''} = ctx.params
    if (!id) {
        fail(ctx, undefined, 400, "请求失败")
        return
    }

    await crud.findOne(ctx, ProductModel, {_id: id}, function (rel) {
        if (rel) {
            self(ctx, {
                code: 200,
                msg: '成功',
                data: rel
            })
        }
    })
}


module.exports = {addProduct, delProduct, updateProduct, getAll, getProductById}