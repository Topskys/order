const ServiceModel = require("../models/chat")
const AdminModel = require("../models/admin")
const UserModel = require("../models/user")
const {fail} = require("../utils/response")
const jwt = require("../utils/jwt")
const crud = require("./crud")


class Chat {

    async userSpeak(ctx) {
        let user
        const {content = ''} = ctx.request.body
        if (!content) return fail(ctx, undefined, 400, "请输入内容")

        const jt = await jwt.isExpired(ctx)
        console.log('userInfo--',jt)
        await crud.findOne(ctx, UserModel, {_id: jt._id}, function (rel) {
            if (rel) {
                user = rel
            } else {
                return fail(ctx, rel, 400, "该账号未注册")
            }
        })

        const params = {
            ...user,
            user_id: user._id,
            role: 'user',
            content
        }

        await crud.add(ctx, ServiceModel, params)
    }

    async serverSpeak(ctx) {
        let admin
        const {content = ''} = ctx.request.body
        if (!content) return fail(ctx, undefined, 400, "请输入内容")

        const jt = await jwt.isExpired(ctx)
        await crud.findOne(ctx, AdminModel, {_id: jt._id}, rel => rel ? (admin = rel) : fail(ctx, rel, 400, "该账号未注册"))

        await crud.add(ctx, ServiceModel, {
            ...admin,
            admin_id: admin._id,
            role: 'server',
            content
        })
    }


    async getChatById(ctx) {
        const _id = ctx.params.id || (await jwt.isExpired(ctx))._id

        await crud.find(ctx, ServiceModel, {user_id:_id})
    }


}

module.exports = new Chat()