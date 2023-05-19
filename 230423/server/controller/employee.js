const crud = require('./crud')
const EmployeeModel = require('../models/employee')
const { fail } = require('../utils/response')


// 新增服务人员
async function addEmployee(ctx) {
    let flag = false
    const { id = '', name = '', experience = '', category = '', skill = '', phone = '' } = ctx.request.body;
    if (!id || !name || !experience || !category || !skill || !phone) return fail(ctx, null, 400, "表单未填写完整！")

    await crud.findOne(ctx, EmployeeModel, { id }, rel => rel ? fail(ctx, null, 400, "该工号的员工已存在") : (flag = true))
const cate=category.split(":")
    const data={
        ...ctx.request.body,
        category:cate[0],
    }
    if (flag) {
        await crud.add(ctx, EmployeeModel,data, function (rel) {
            ctx.body = {
                code: 200,
                msg: "添加成功",
                data: rel
            }
        })
    } else {
        fail(ctx, null, 400, "添加失败")
    }
}


// 删除
const delEmployee = async (ctx) => await crud.del(ctx, EmployeeModel, { _id: ctx.params.id })


// 修改服务人员信息
const updateEmpInfo = async ctx => await crud.update(ctx, EmployeeModel, { _id: ctx.params.id }, ctx.request.body)


// 分页获取员工列表列表
async function getEmpList(ctx) {
    const { name = '', phone = '' } = ctx.query
    console.log(name, phone)
    const keyword = phone.trim() || name.trim() || ''
    const regex = new RegExp(keyword, 'i')
    await crud.findByPagination(ctx, EmployeeModel, ctx.request.query, {
        $or: [
            { name: regex },
            { phone: regex },
        ]
    })
}


// 获取所有员工数组
async function getList(ctx) {
    await crud.find(ctx, EmployeeModel)
}



module.exports = { addEmployee, getList,delEmployee, updateEmpInfo, getEmpList }
