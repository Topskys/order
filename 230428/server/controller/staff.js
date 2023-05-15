const crud = require('./crud')
const StaffModel = require('../models/staff')
const {success, self, fail, exception} = require('../utils/response')


class Staff {

    async create(ctx) {
        let flag = false
        const {name = '', phone = ''} = ctx.request.body
        if (!name || !phone ) {
            fail(ctx, undefined, 400, "请求参数错误")
            return
        }
        await crud.find(ctx, StaffModel, {name,phone}, rel => rel && rel.length ? fail(ctx, undefined, 400, "该师傅已存在") : (flag = true))
        flag && await crud.add(ctx, StaffModel, ctx.request.body)
    }

    async del(ctx) {
        const {id = ''} = ctx.params
        id ? await crud.del(ctx, StaffModel, {_id: id}) : fail(ctx,undefined,400, "删除失败")
    }

    async edit(ctx) {
        let staff 
        const {name = '', phone = ''} = ctx.request.body
        if (!name || !phone ) fail(ctx, undefined, 400, "请求参数错误")

        await crud.findOne(ctx, StaffModel, {_id: ctx.params.id}, rel => rel ? (staff = rel) : fail(ctx, undefined, 400, "该师傅不存在"))
        staff ? await crud.update(ctx, StaffModel, {_id: ctx.params.id}, ctx.request.body) : fail(ctx,undefined,400, "信息更新失败")
    }


    async getAll(ctx) {
        const {name = '',phone='',work_year=''} = ctx.query
        const keyword=work_year||phone||name
        const regex = new RegExp(keyword, 'i')
        const where = {
            $or: [
                {name: regex},
                {phone: regex},
                {work_year: regex},
            ]
        }
        await crud.findByPagination(ctx, StaffModel, ctx.request.query, where)
    }

    async getById(ctx) {
        const {id = ''} = ctx.params
        if (!id) fail(ctx, undefined, 400, "请求参数错误")

        await crud.findOne(ctx, StaffModel, {_id: id})
    }

}


module.exports = new Staff()