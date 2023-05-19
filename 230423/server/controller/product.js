const crud = require('./crud')
const ProductModel = require('../models/product')// 家政服务数据模型
const EmployeeModel = require('../models/employee') // 员工数据模型
const { success, self, fail } = require('../utils/response')


// 添加家政服务
const addProduct = async (ctx) => { // like ： async function addProduct(){}
    const { employee_name = '', poster = '', cate_title = '', } = ctx.request.body
    if (!employee_name || !poster || !cate_title) fail(ctx, undefined, 400, "请求失败")
    // 分割（employee_name为"name:_id"，分割后为[name,_id]）
    const n = employee_name.split(':')
    const c = cate_title.split(':')

    // 组织整理数据
    const data = {
        ...ctx.request.body,
        employee_name: n[0],
        employee_id: n[1],
        cate_title: c[0],
        cate_id: c[1]
    }

    // 查找员工信息
    let emp
    await crud.findOne(ctx, EmployeeModel, { _id: data.employee_id || n[1] }, rel => (emp = rel))

    // 插入家政服务表
    if (emp) {
        await crud.add(ctx, ProductModel, {
            ...data,
            experience: emp.experience,
            skill: emp.skill
        }, rel => {
            if (rel) {
                ctx.body = {
                    code: 200,
                    msg: "添加成功",
                    data: rel
                }
            } else {
                return fail(ctx, undefined, 400, "添加失败")
            }
        })
    } else {
        return fail(ctx, undefined, 400, "未找到员工信息")
    }
}


const delProduct = async ctx => await crud.del(ctx, ProductModel, { _id: ctx.params.id })


const updateProduct = async (ctx) => {
    let product
    const { id = '' } = ctx.params
    const { employee_name = '', poster = '', cate_title = '', } = ctx.request.body
    if (!id || !employee_name || !poster || !cate_title) fail(ctx, undefined, 400, "请求失败")

    const n = employee_name.split(':')
    const c = cate_title.split(':')
    const data = {
        ...ctx.request.body,
        employee_name: n[0],
        employee_id: n[1],
        cate_title: c[0],
        cate_id: c[1]
    }

    await crud.update(ctx, ProductModel, { _id: id }, data, function (rel) {
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


// 分页获取列表
const getAll = async (ctx) => {
    const { name = '', select = '', keyword = '' } = ctx.query
    const kd = select || name || keyword
    const regex = new RegExp(kd, 'i')
    await crud.findByPagination(ctx, ProductModel, ctx.request.query, {
        $or: [
            { employee_name: regex },
            { cate_title: regex },
            { location: regex },
        ]
    })
}


// 获取数据数组
const getArr= async (ctx) => {
    const { keyword = '' } = ctx.query
    const regex = new RegExp(keyword, 'i')
    await crud.find(ctx, ProductModel, {
        $or: [
            { cate_title: regex },
        ]
    })
}


const getProductById = async (ctx) => {
    const { id = '' } = ctx.params
    if (!id) {
        fail(ctx, undefined, 400, "请求失败")
        return
    }

    await crud.findOne(ctx, ProductModel, { _id: id }, function (rel) {
        if (rel) {
            self(ctx, {
                code: 200,
                msg: '成功',
                data: rel
            })
        }
    })
}


// 添加服务项
async function addService(ctx) {
    const { id = '' } = ctx.params
    const { service = '' } = ctx.request.body
    if (!id || !service) {
        fail(ctx, undefined, 400, "请求失败")
        return
    }
    console.log("-----", service)

    let product
    await crud.findOne(ctx, ProductModel, { _id: id }, rel => (product = rel)) // rel=>(product=rel) == function(rel){product=rel;return product}

    if (product) {
        await crud.update(ctx, ProductModel, { _id: id }, {
            $set: {
                services: [...product.services, service]
            }
        }, function (rel) {
            if (rel && rel.modifiedCount > 0) {
                ctx.body = {
                    code: 200,
                    data: rel,
                    msg: "修改成功"
                }
            } else {
                ctx.body = {
                    code: 200,
                    data: rel,
                    msg: "已修改"
                }
            }
        })
    } else {
        return fail(ctx, undefined, 400, "系统不存在该家政服务产品")
    }
}


module.exports = { addProduct, getArr, addService, delProduct, updateProduct, getAll, getProductById }