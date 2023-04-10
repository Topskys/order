const adminModel = require('../models/admin')
const {findOne, find, add, findByPagination} = require('./crud')
const {success, self, fail, exception} = require("../utils/response")
const {isExpired, createToken} = require("../utils/jwt")
const cache = require("../utils/redis")


/**
 * 管理员
 */
class Admin {


    /**
     * 管理员登录
     * @param ctx
     * @returns {Promise<void>}
     */
    async login(ctx) {
        let admin = null
        const {username, password} = ctx.request.body;

        // 判空
        if (!username || !password) return fail(ctx, undefined, 400, "账号或密码为空")

        // 查找账号
        await findOne(ctx, adminModel, {
            username,
            password
        }, res => (res ? (admin = res) : fail(ctx, res, 400, "该账号不存在")))

        // 作比较，获取token，设置redis缓存
        if (admin && admin.username === username && admin.password === password) {
            // 检查是否有token、token过期时间、缓存token等。
            // 如果已经登录且token有效，不再生成新的token，
            // 直接返回登录成功，否则重新登录获取新的token并设置缓存。
            const expires = await isExpired(ctx)
            const hasToken = await cache.get(admin._id.toString())

            if (expires && hasToken) return self(ctx, {
                code: 200,
                token: ctx.get("Authorization"),
                msg: "已登录"
            })

            try {
                const token = createToken({_id: admin._id, username: admin.username})
                const result = await cache.set(admin._id.toString(), token, 7 * 24 * 60 * 60) // 7 days

                token && result && self(ctx, {
                    code: 200,
                    token,
                    msg: "success"
                })
            } catch (e) {
                ctx.throw(`${new Date().toLocaleString()}：登录时出现异常`)
            }
        } else {
            fail(ctx, undefined, 400, "登录失败")
        }
    }


    // 注册(测试用，不作为常用接口)
    async register(ctx) {
        let [{username, password}, temp] = [ctx.request.body, null];

        if (!username || !password) return fail(ctx, undefined, 400, "账号或密码未填写！")

        // 判断该账户是否已经注册
        await find(ctx, adminModel, {username}, rel => {
            if (rel && rel.length) {
                temp = rel
                self(ctx, {
                    code: 400,
                    msg: '该账户名已存在'
                })
            }
        })

        // 插入数据库
        !temp && await add(ctx, adminModel, ctx.request.body, rel => {
            rel ? self(ctx, {
                code: 200,
                msg: '注册成功'
            }) : exception(ctx, rel, 500, "注册时出现异常")
        })
    }


    /**
     * 获取管理员个人信息
     * @param ctx
     * @returns {Promise<void>}
     */
    async getInfo(ctx) {
        const result = await isExpired(ctx)

        result && await findOne(ctx, adminModel, {_id: result._id}, rel => {
            rel ? self(ctx, {
                code: 200,
                data: rel,
                msg: "认证成功"
            }) : fail(ctx, rel, 401, "认证失败")
        })
    }


    async logout(ctx) {
        const result = await isExpired(ctx)
        const cacheToken = await cache.get(result._id.toString())
        cacheToken && await cache.del(result._id.toString())
        success(ctx, undefined, 200, "退出成功")
    }


    /**
     * 模糊查询，获取设备信息列表
     * @param ctx
     * @returns {Promise<void>}
     */
    async getAll(ctx) {
        const {name = '', selection = ''} = ctx.query
        const keyword = selection ? selection : name
        const regex = new RegExp(keyword, 'i')
        // 模糊查询条件，支持匹配多个字段查询
        const where = {
            $or: [
                {name: regex},
                {identification: regex},
            ]
        }
        await findByPagination(ctx, adminModel, ctx.request.query, where)
    }

}


module.exports = new Admin()
