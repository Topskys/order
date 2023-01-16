const jwt = require('jsonwebtoken')
const Users =require('../models/user')
const crud = require('../controller/crudUtil')
const {responseSelf, fail,exception} = require('../util/response')



/**
 * 新增用户
 * @param ctx
 * @returns {Promise<void>}
 */
const add=async (ctx,model,params)=>{
    let {phone,nickName}=params
    if(!phone || !nickName) {
        fail(ctx,null,300,'手机号或昵称不能为空')
        return
    }
    await model.create(params).then(rel=>{
        if(rel){
            let token = jwt.sign({
                nickName: rel.nickName,
                _id: rel._id,
            }, '2311-server-jwt', {
                expiresIn: 3600 * 24 * 7 // 1 days
            })

            responseSelf(ctx,{
                code: 200,
                msg: "登录成功",
                token,
                // userInfo:rel
            })
        }else{
            responseSelf(ctx,{
                code: 300,
                msg: "登录失败",
                rel
            })
        }
    }).catch(err => {
        exception(ctx,err)
    })
}


/**
 * 更新用户信息
 * @param ctx
 * @returns {Promise<void>}
 */
const update=async ctx=>{
    let params=ctx.request.body;
    await crud.update(ctx,Users,{_id:params._id},params)
}


/**
 * 查询所有用户，带条件查询
 * @param ctx
 * @returns {Promise<void>}
 */
const findAll=async ctx =>{
    let {page = 1, pageSize = 10,nickName = null} = ctx.query;

    // 判断页码
    !page || isNaN(Number(page)) ? (page = 1) : (page = Number(page))

    // 计算总页数
    let count = 0
    await Users.find({nickName:nickName}).count().then(rel => {
        count = rel
    })
    let totalPage = 0
    count > 0 && (totalPage = Math.ceil(count / pageSize))

    // 判断当前页码的范围
    if (totalPage > 0 && page > totalPage) {
        page = totalPage
    } else if (page < 1) {
        page = 1
    }

    // 计算起始位置
    let start = (page - 1) / pageSize

    await Users.find({nickName:nickName}).skip(start).limit(pageSize).then(rel => {
            rel && rel.length > 0 ? responseSelf(ctx, {
                code: 200,
                msg: 'success',
                data: rel,
                page,
                pageSize,
                total: count
            }) : fail(ctx, rel)
        }).catch(err => {
            exception(ctx,err)
        })
}


/**
 * 用户登录
 * @param ctx
 * @returns {Promise<void>}
 */
const login=async ctx =>{
    let {nickName,phone} =ctx.request.body;

    await Users.findOne({nickName,phone}).then(rel => {
        if (rel) {

            let token = jwt.sign({
                nickName: rel.nickName,
                _id: rel._id,
            }, '2311-server-jwt', {
                expiresIn: 3600 * 24 * 7 // 1 days
            })

            responseSelf(ctx,{
                code: 200,
                msg: "登录成功",
                token,
                // userInfo:rel
            })

        } else {
            add(ctx,Users,ctx.request.body)
        }
    }).catch(err => {
        exception(ctx,err)
    })
}


/**
 * @description: 验证用户登录
 * @param {*} ctx
 * @return {*}
 */
const verify = async ctx => {
    let token = ctx.header.authorization
    token = token.replace('Bearer ', '') // 注意'Bearer '后面的空格

    try {
        let res = jwt.verify(token, '2311-server-jwt')

        await Users.findOne({ _id: res._id }).then(rel => {
            if (rel) {
                ctx.body = {
                    code: 200,
                    msg: "用户认证成功",
                    userInfo: rel
                }
            } else {
                ctx.body = {
                    code: 500,
                    msg: "用户认证失败",
                    data: rel
                }
            }
        }).catch(err => {
            exception(ctx,err)
        })
    } catch (err) {
        exception(ctx,err)
    }
}





module.exports={
    login,
    verify,
    update,
    findAll,
}
