const crud = require("./crud")
const DiscModel = require("../models/discount")
const UserModel = require("../models/user")
const { isExpired } = require("../utils/jwt")
const { fail, self } = require("../utils/response")



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
                    title: new RegExp(keyword, 'i'),
                    money_size: new RegExp(keyword, 'i'),
                }
            ]
        }
        await crud.findByPagination(ctx, DiscModel, ctx.request.query, where)
    }

    async getList(ctx) {
        await crud.find(ctx, DiscModel)
    }

    // 用户领取福利
    async getById(ctx) {
        let user, disc, flag = false
        // user info
        await crud.findOne(ctx, UserModel, { _id: (await isExpired(ctx))._id.toString() }, rel => rel ? (user = rel) : fail(ctx, rel, 400, "该账号未注册"))
        // discount info
        await crud.findOne(ctx, DiscModel, { _id: ctx.params.id }, rel => rel ? (disc = rel) : fail(ctx, rel, 400, "未找到福利信息"))

        // 判断福利是否已经存在
        const arr = user.discount || []
        if (arr.length > 0) {
            arr.forEach(item => (flag = !(item._id.toString() == ctx.params.id)))
        } else {
            flag = true
        }

        // update user info
        flag ? await crud.update(ctx, UserModel, {
            _id: (await isExpired(ctx))._id.toString()
        }, {
            $set: {
                discount: [...arr, disc]
            }
        }, rel => {
            if (rel && rel.modifiedCount) {
                ctx.body = {
                    code: 200,
                    msg: "领取成功",
                    data: rel
                }
            } else {
                fail(ctx, rel, 400, "信息更新失败")
            }
        }) : fail(ctx, undefined, 400, "你已领取")
    }

}


module.exports = new Discount()