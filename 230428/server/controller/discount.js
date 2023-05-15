const crud = require("./crud") 
const DiscModel = require("../models/discount")
const { fail} = require("../utils/response")



class Discount {

    // 新增福利信息
    async create(ctx) {
        let flag = false
        const { title = '', money_size = '', count = '', } = ctx.request.body
        if (!title) return fail(ctx, undefined, 400, "标题不能为空")
        if (!count) return fail(ctx, undefined, 400, "请输入优惠劵的数量")
        if (!money_size) return fail(ctx, undefined, 400, "金额不能为空")

        await crud.find(ctx, DiscModel, { title }, function (rel) {
            if (rel && rel.length) {
                flag = false
                return fail(ctx, undefined, 400, "相同标题已存在")
            } else {
                flag = true
            }
        })

        flag && await crud.add(ctx, DiscModel, ctx.request.body)
    }

    async remove(ctx) {
        const { id = '' } = ctx.params
        if (!id) return fail(ctx, undefined, 400, "请求错误")
        await crud.del(ctx, DiscModel, { _id: id })
    }

    async edit(ctx) {
        const { id = '' } = ctx.params
        if (!id) return fail(ctx, undefined, 400, "请求错误")
        const { title = '', money_size = '', count = '', } = ctx.request.body
        if (!title) return fail(ctx, undefined, 400, "标题不能为空")
        if (!count) return fail(ctx, undefined, 400, "请输入优惠劵的数量")
        if (!money_size) return fail(ctx, undefined, 400, "金额不能为空")
        await crud.update(ctx, DiscModel, { _id: id }, ctx.request.body)
    }


    async getAll(ctx) {
        const { keyword = '' } = ctx.query
        const where = {
            $or: [
                {
                    money_size: new RegExp(keyword, 'i'),
                    title: new RegExp(keyword, 'i')
                }
            ]
        }
        await crud.findByPagination(ctx, DiscModel,ctx.request.query, where)
    }

}


module.exports = new Discount()