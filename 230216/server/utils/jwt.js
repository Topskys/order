const jwt = require('jsonwebtoken')
const KEY = 'jwt-key'

/**
 * JSON Web Token
 */
class JWT {

    /**
     * 生成token
     * @param email
     * @param _id
     * @param expires
     * @returns {*|{hash: Binary, keyId: Long}|MSFIDOSignature|ArrayBuffer|string}
     */
    createToken(email, _id, expires) {
        const token = jwt.sign(
            {
                email: email,
                _id: _id
            },
            KEY,
            {
                expiresIn: expires || 5 * 60 * 1000 // 5 minutes （second）
            }
        )
        return token
    }


    /**
     * 检查token
     * @param ctx
     * @param next
     * @param routes 配置不用检查token的路由
     * @returns {Promise<void>}
     */
    async verify(ctx, routes,next) {
        if (!routes.includes(ctx.request.path)) {
            const auth = ctx.get('Authorization')

            !auth && ctx.throw(401, 'no token detected in http headerAuthorization')

            try {
                await jwt.verify(auth.replace("Bearer ", ""), KEY)
            } catch (err) {
                ctx.throw(401, 'invalid token')
            }
        }
        next()
    }




}


module.exports = JWT
