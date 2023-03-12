const jwt = require('jsonwebtoken')
const KEY = 'jwt-key'

/**
 * JSON Web Token
 */
class JWT {

    /**
     * 生成token
     * @param options (email,_id,expiresIn)
     * @returns {String}
     */
    createToken(options) {
        const token = jwt.sign(
            {
                email: options?.email,
                _id: options?._id
            },
            KEY,
            {
                expiresIn: options?.expiresIn || 5 * 60 * 1000 // 5minutes
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
                await jwt.verify(auth.split(' ')[1], KEY)
            } catch (err) {
                ctx.throw(401, 'invalid token')
            }
        }
        await next()
    }




}


module.exports = JWT
