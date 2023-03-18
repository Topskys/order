const CRUD = require('../controller/crud')
const UserModel = require('../models/user')
const JWT = require('../utils/jwt')
const Redis = require('../utils/redis')
const Mailer = require('../utils/nodemailer')
const Response = require('../utils/response')
const jwt = require('jsonwebtoken')


const crud = new CRUD()
const redis = new Redis()
const mailer = new Mailer()
const {self, fail, exception} = new Response()


/**
 * 客户端用户类
 */
class User {

    // 客户端用户登录
    async login(ctx) {
        let temp = null;
        const {email, password} = ctx.request.body;

        if (!email || !password) return fail(ctx, undefined, 400, "邮箱或密码未填写！")

        await crud.findOne(ctx, UserModel, {email}, rel => rel ? (temp = rel) : fail(ctx, rel, 400, "该邮箱未注册！"))


        if (email === temp.email && password === temp.password) {

            // const lastToken = await redis.get(temp.email)
            // if (lastToken) return self(ctx, {
            //     code: 200,
            //     token: lastToken,
            //     msg: "登录成功"
            // })

            const token = new JWT().createToken(temp.email, temp._id, 7 * 24 * 60 * 60) // 3600 * 24 * 1 one day

            if (!token) return fail(ctx, undefined, 500, "登录失败")

            try {
                const res = await redis.set(temp.email, token, 7 * 24 * 60 * 60) // 7days
                res ? self(ctx, {
                    code: 200,
                    token,
                    msg: "登录成功"
                }) : fail(ctx, undefined, 500, "登录失败")
            } catch (err) {
                exception(ctx, err, 500, "登录时出现异常")
            }
        } else {
            return fail(ctx, undefined, 500, "邮箱或密码错误")
        }
    }


    // 客户端用户注册
    async register(ctx) {
        let [{email, password, code}, temp] = [ctx.request.body, null];

        if (!code) return fail(ctx, undefined, 400, "验证码未填写！")
        if (!email || !password) return fail(ctx, undefined, 400, "邮箱或密码未填写！")

        // 判断该账户是否已经注册
        await crud.find(ctx, UserModel, {email}, rel => {
            if (rel.isArray && rel.length) {
                temp = rel
                self(ctx, {
                    code: 200,
                    data: rel,
                    msg: '该邮箱已注册'
                })
            }
        })

        // 验证码对比
        redis.get("code").then(res => {
            code.includes(res) ? (temp = null) : fail(ctx, undefined, 400, "验证码错误！")
        }).catch(err => {
            exception(ctx, err, 500, "注册时出现异常")
        })

        // 插入数据库
        !temp && await crud.add(ctx, UserModel, ctx.request.body, rel => {
            rel ? self(ctx, {
                code: 200,
                data: rel,
                msg: '注册成功'
            }) : exception(ctx, rel, 500, "注册时出现异常")
        })
    }


    // 获取邮箱验证码
    async getCode(ctx) {
        const {email} = ctx.request.body;

        if (!email) return fail(ctx, undefined, 400, "邮箱未填写！")

        // 生成验证码
        const code = Math.floor(Math.random() * 9000 + 1000)

        // 邮箱配置及发送内容
        const mailOptions = {
            to: email, // 收件人邮箱地址
            subject: 'Mark-Verify your email', // 邮件主题
            // text: 'Hi Mark', // 邮件正文
            html: `<b>${code}</b>
            <p style="fontSize:16px">To continue setting up your Mark account,
            please verify that this is your email address.</p>
            <p style="fontSize:12px;">
            This code will expire in 5 minutes.If you did not make this request,
            please disrsgard this email.For help,concat us through our
            <a href="mr.llb@proton.me" style=" color:#0066cc;fontSize:inherit;">Help center</a></p>` // 邮件正文（HTML 格式）
        }

        try {
            // 设置验证码Redis缓存
            await redis.set("code", code, 5 * 60) // 5 minutes

            // 发送验证邮箱验证码
            const res = await mailer.sendMail(mailOptions)

            res ? self(ctx, {
                code: 200,
                msg: 'Please enter the verification code, which has been sent to your email.'
            }) : fail(ctx, res, 500)

        } catch (e) {
            exception(ctx, e, 500)
        }
    }


    // 验证信息
    async verify(ctx) {
        let auth = ctx.header.authorization

        auth = auth.replace('Bearer ', '')

        !auth && ctx.throw(401, 'no token detected in http headerAuthorization')

        try {
            const res = await jwt.verify(auth, 'jwt-key')

            await crud.findOne(ctx, UserModel, {_id: res._id}, rel => {
                rel ? self(ctx, {
                    code: 200,
                    userInfo: rel,
                    msg: "用户认证成功"
                }) : fail(ctx, rel, 401, "用户认证失败")
            })
        } catch (err) {
            ctx.throw(401, 'invalid token')
        }
    }


    // 获取用户列表
    async getAll(ctx) {
        await crud.findByPagination(ctx, UserModel, ctx.query, {email: new RegExp(ctx.query.keyword)})
    }
}


module.exports = User
