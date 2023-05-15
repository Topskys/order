const crud = require('../controller/crud')
const UserModel = require('../models/user')
const { isExpired, createToken } = require('../utils/jwt')
const cache = require('../utils/redis')
const jwt = require('../utils/jwt')
const { success, self, fail, exception } = require('../utils/response')


// 客户端用户登录
async function login(ctx) {
    let temp = null;
    const { username, password } = ctx.request.body;

    if (!username || !password) return ctx.throw(400, "账号或密码未填写！")
    await crud.findOne(ctx, UserModel, {
        username,
        password
    }, function (rel) {
        if (rel) {
            temp = rel
        } else {
            fail(ctx, rel, 400, "该账号未注册！")
        }
    })

    if (temp && username === temp.username && password === temp.password) {
        try {
            const token = createToken({ username: temp.username, _id: temp._id }, 24 * 60 * 60) // 3600 * 24 * 1 one day
            const result = await cache.set(temp._id.toString(), token, 24 * 60 * 60) // 7days

            token && result && self(ctx, {
                code: 200,
                token,
                msg: "登录成功"
            })
        } catch (err) {
            ctx.throw(500, "登录时出现异常")
        }
    } else {
        return ctx.throw(400, "账号或密码错误！")
    }
}


// 用户注册
async function register(ctx) {
    let { username, password, gender = 0 } = ctx.request.body
    let temp = null;

    if (!username || !password) return fail(ctx, undefined, 400, "账号或密码未填写！")

    // 判断该账户是否已经注册
    await crud.find(ctx, UserModel, { username }, rel => {
        if (rel && rel.length) {
            temp = rel
            self(ctx, {
                code: 200,
                data: rel,
                msg: '该账号已注册'
            })
        }
    })

    // 插入数据库
    !temp && await crud.add(ctx, UserModel, { ...ctx.request.body, gender: `${gender != 0 ? '女' : '男'}` }, rel => {
        rel ? self(ctx, {
            code: 200,
            data: rel,
            msg: '注册成功'
        }) : exception(ctx, rel, 500, "注册时出现异常")
    })
}


// 获取邮箱验证码（暂无）
async function getCode(ctx) {
    const { username } = ctx.request.body;

    if (!username) return fail(ctx, undefined, 400, "账号未填写！")

    // 生成验证码
    const code = Math.floor(Math.random() * 9000 + 1000)

    // 邮箱配置及发送内容
    const mailOptions = {
        to: username, // 收件人邮箱地址
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
        await cache.set("code", code, 5 * 60) // 5 minutes
        // 发送验证邮箱验证码
        // const res = await mailer.sendMail(mailOptions)
        res ? self(ctx, {
            code: 200,
            msg: 'Please enter the verification code, which has been sent to your email.'
        }) : fail(ctx, res, 500)
    } catch (e) {
        exception(ctx, e, 500)
    }
}


// 验证信息
async function getUserInfo(ctx) {
    let auth = ctx.header.authorization
    !auth && ctx.throw(401, 'Token无效')
    try {
        const res = await jwt.isExpired(ctx)
        await crud.findOne(ctx, UserModel, { _id: res._id }, rel => {
            rel ? self(ctx, {
                code: 200,
                userInfo: rel,
                msg: "获取信息成功"
            }) : fail(ctx, rel, 401, "获取信息失败")
        })
    } catch (err) {
        ctx.throw(500, '系统出现异常')
    }
}


// 退出登录
async function logout(ctx) {
    try {
        const user = await isExpired(ctx)
        const result = await cache.get(user._id.toString())
        result && await cache.del(user._id.toString())
        user && result && (ctx.body = {
            code: 200,
            msg: "退出成功"
        })
    } catch (err) {
        ctx.throw(500, "系统出现异常")
    }
}


// 获取用户列表
async function getUsers(ctx) {
    const { keyword = '' } = ctx.query
    const regex = new RegExp(keyword, 'i')
    await crud.findByPagination(ctx, UserModel, ctx.request.query, {
        $or: [
            { username: regex },
            { nickname: regex },
        ]
    })
}


// 管理员新增用户
async function createUser(ctx) {
    let temp
    await crud.findOne(ctx, UserModel, { username: ctx.request.body.username }, function (rel) {
        rel ? (temp = rel) : fail(ctx, undefined, 400, "该账号已经存在")
    })
    temp && await crud.add(ctx, UserModel, ctx.request.body)
}


async function removeUser(ctx) {
    let temp
    const { id } = ctx.params
    await crud.findOne(ctx, UserModel, { _id: id }, rel => {
        rel ? (temp = rel) : fail(ctx, undefined, 400, "该账号未注册")
    })
    temp && await crud.del(ctx, UserModel, { _id: id })
}

const updateUserInfo = async ctx => await crud.update(ctx, UserModel, { _id: ctx.params.id }, ctx.request.body)


module.exports = { login, register, getUserInfo, getUsers, createUser, removeUser, updateUserInfo, logout }
