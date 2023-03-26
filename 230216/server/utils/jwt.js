/*
 * @Author: Topskys
 * @Date: 2023-03-06 22:52:27
 * @LastEditTime: 2023-03-23 11:27:17
 */
const jwt = require('jsonwebtoken')
const { EXPIRES, SECRET } = require("../controller/config/jwt")

/**
 * JSON Web Token
 */
class JWT {

    /**
     * 生成token
     * @param payload 负载数据
     * @param expires 有效期
     * @returns {*|{hash: Binary, keyId: Long}|MSFIDOSignature|ArrayBuffer|string}
     */
    createToken(payload, expires) {
        return `Bearer ${jwt.sign(
            {
                ...payload
            },
            SECRET,
            {
                expiresIn: expires || EXPIRES, // 5 minutes （second）
            }
        )}`
    }



    /**
     * 检查token是否过期
     * @param ctx
     * @returns {Promise<*|boolean>}
     */
    async isExpired(ctx) {
        const auth = ctx.get('Authorization') || ctx.header.authorization
        if (!auth) return

        try {
            return await jwt.verify(auth.replace("Bearer ", ""), SECRET)
        } catch (err) {
            ctx.throw(401, `invalid token,${err}`)
        }
    }


    /**
     * 检查token
     * @param ctx
     * @param next
     * @param routes 配置不用检查token的路由
     * @returns {Promise<void>}
     */
    async verify(ctx, routes=[], next) {
        if (!routes.includes(ctx.request.path)) {
            const auth = ctx.get('Authorization')
            !auth && ctx.throw(401, 'no token detected in http headerAuthorization')

            try {
                await jwt.verify(auth.replace("Bearer ", ""), SECRET)
            } catch (err) {
                ctx.throw(401, 'invalid token')
            }
        }
        next()
    }




}


module.exports = new JWT()
