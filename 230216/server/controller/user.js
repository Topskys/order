const CRUD = require('../controller/crud')
const UserModel = require('../models/user')
const JwtModel = require('../models/jwt')
const JWT = require('../utils/jwt')
// const Redis = require('../utils/redis')
const Mailer = require('../utils/nodemailer')
const Response = require('../utils/response')


const crud = new CRUD()
// const {setRedis, getRedis, delRedis} = new Redis()
const mailer = new Mailer()
const {self, fail, exception} = new Response()


/**
 * 客户端用户类
 */
class User {

    // 客户端用户登录
    async login(ctx) {
        let [obj, userJWT] = [null, null];
        const {email, password} = ctx.request.body;

        if (!email || !password) return fail(ctx, undefined, 400, "邮箱或密码未填写！")

        await crud.findOne(ctx, UserModel, {email, password}, rel => rel ? (obj = rel) : fail(ctx, rel, 400, "该邮箱未注册！"))


        if (obj) {
            const token = new JWT().createToken({...obj, expiresIn: 5000}) // 3600 * 24 * 1 one day

            if (!token) return fail(ctx, undefined, 500, "登录时出现异常")

            await crud.findOne(ctx, JwtModel, {userId: obj._id}, rel => rel && (userJWT = rel))

            userJWT.userId ? await crud.update(ctx, JwtModel, {userId: obj._id}, {
                    $set: {
                        token: token
                    }
                }, rel => {
                    if (rel && rel.modified > -1) {

                        // setRedis(obj._id,token)

                        self(ctx, {
                            code: 200,
                            data: {
                                token
                            },
                            msg: "登录成功"
                        })
                    } else {
                        fail(ctx, undefined, 500, "登录时出现异常")
                    }
                }
            ) : await crud.add(ctx, JwtModel, {userId: obj._id, email: obj.email, token}, rel => {
                    if (rel) {
                        // setRedis(obj._id,token)

                        self(ctx, {
                            code: 200,
                            data: {
                                token
                            },
                            msg: "登录成功"
                        })
                    } else {
                        fail(ctx, undefined, 500, "登录时出现异常")
                    }
                }
            )
        }

    }


    // 客户端用户注册
    async register(ctx) {

        let [{email, password, code}, account] = [ctx.request.body, null];

        if (!email || !password || !code) return fail(ctx, undefined, 400, "邮箱、密码或验证码未填写！")

        // 判断该账户是否已经注册
        await crud.find(ctx, UserModel, {email}, rel => {
            if (rel.length) {
                account = rel
                self(ctx, {
                    code: 200,
                    data: rel,
                    msg: '邮箱已注册，请登录'
                })
            }
        })


        getRedis("code").then(res => {
            if (code !== res) {
                account = null
                fail(ctx, undefined, 400, "验证码错误！")
            }
        }).catch(err => {
            exception(ctx, err, 500, "注册时出现异常")
        })


        account ? await crud.update(ctx, UserModel,
            {_id: account._id, email},
            {
                $set: {
                    verify: true,
                    code
                }
            }, rel => {
                rel && rel.modifiedCount > -1 ? self(ctx, {
                    code: 200,
                    data: rel,
                    msg: '请继续完成邮箱验证'
                }) : exception(ctx, rel, 500, "注册时出现异常")
            }) : await crud.add(ctx, UserModel,ctx.request.body, rel => {
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

        try {
            const res = await mailer.sendMail({
                to: email, // 收件人邮箱地址
                subject: 'Mark-Verify your email', // 邮件主题
                // text: 'Hi Mark', // 邮件正文
                html: `<b>${Math.floor(Math.random() * 9000 + 1000)}</b>
            <p style="fontSize:16px">To continue setting up your Mark account,
            please verify that this is your email address.</p>
            <p style="fontSize:12px;">
            This code will expire in 5 minutes.If you did not make this request,
            please disrsgard this email.For help,concat us through our
            <a href="mr.llb@proton.me" style=" color:#0066cc;fontSize:inherit;">Help center</a></p>` // 邮件正文（HTML 格式）
            })

            res ? self(ctx, {
                code: 200,
                msg: 'Please enter the verification code, which has been sent to your email.'
            }) : fail(ctx, res, 500)
        } catch (e) {
            exception(ctx, e, 500)
        }
    }


    getAll(ctx) {
        ctx.body = {
            code: 200,
            msg: 'OK',
        }
    }
}


module.exports = User
