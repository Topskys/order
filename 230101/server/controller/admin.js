const jwt = require('jsonwebtoken')
const Admins = require('../models/admin')
const crud = require('../controller/crudUtil')
const {success, responseSelf, fail, exception} = require('../util/response')
const dtf = require('../util/dateTimeFormat');




/**
 * 管理员登录
 * @param ctx
 * @returns {Promise<void>}
 */
const login = async ctx => {
    let {username,password} = ctx.request.body;

    console.log('sss-',new Date(Date.now()).toLocaleString(),username)

    if (!username || !password) {
        fail(ctx, undefined, 300, '账号或密码不能为空')
        return
    }

    // 登录相关操作
    const fun = (ctx, rel) => {
        let token = jwt.sign({
            username: rel.username,
            _id: rel._id,
        }, '2311-server-jwt', {
            expiresIn: 3600 * 24 * 7 // 1 days
        })

        responseSelf(ctx, {
            code: 200,
            // msg: "登录成功，欢迎管理员"+rel.username,
            token,
        })
    }


    // 执行登录操作
    await crud.findOne(ctx, Admins, {username,password}, rel => rel ? fun(ctx, rel) : fail(ctx, rel, 300, "登录失败"));
}


/**
 * @description: 验证管理员登录
 * @param {*} ctx
 * @return {*}
 */
const verify = async ctx => {
    let token = ctx.header.authorization
    token = token.replace('Bearer ', '') // 注意'Bearer '后面的空格

    try {
        let res = jwt.verify(token, '2311-server-jwt')

        await Admins.findOne({_id: res._id}).then(rel => {
            if (rel) {
                rel.phone = rel.phone && rel.phone.replace(/^(\d{3})\d{4}(\d+)/, "$1****$2")
                ctx.body = {
                    code: 200,
                    msg: "管理员认证成功",
                    data: rel
                }
            } else {
                ctx.body = {
                    code: 500,
                    msg: "管理员认证失败",
                    data: rel
                }
            }
        }).catch(err => {
            exception(ctx, err)
        })
    } catch (err) {
        exception(ctx, err)
    }
}


/**
 * 管理员注册
 * @param ctx
 * @returns {Promise<void>}
 */
const register=async ctx=>{
    let [params,flag] =[ctx.request.body,false];

    if (!params.username || !params.password) {
        fail(ctx, null, 300, '账号或密码不能为空')
        return
    }

    await crud.findOne(ctx,Admins,{username: params.username},rel=>rel?fail(ctx,undefined,401,'该用户名已存在'):(flag=true))

    flag && await crud.add(ctx,Admins,params,rel=>success(ctx,rel,undefined,'注册成功'))
}



module.exports = {
    login,
    verify,
    register
}
