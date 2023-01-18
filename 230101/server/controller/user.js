const jwt = require('jsonwebtoken')
const Users =require('../models/user')
const crud = require('../controller/crudUtil')
const {responseSelf, fail,exception} = require('../util/response')
const dtf=require('../util/dateTimeFormat');



/**
 * 更新用户信息
 * @param ctx
 * @returns {Promise<void>}
 */
const update=async ctx=>{
    let params=ctx.request.body;
    params={...params,gender:params.gender.includes('女')?'1':'0',updateTime:dtf(Date.now(),"YYYY-MM-DD hh:mm:ss")}
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
    let flag = false;
    let {phone,nickName,avatarUrl,gender}=ctx.request.body;
    if(!phone || !nickName) {
        fail(ctx,null,300,'手机号或昵称不能为空')
        return
    }

    // 登录相关操作
    const fun=(ctx,rel)=>{
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
    }

    // 执行登录操作
    await crud.findOne(ctx,Users,{nickName:nickName,phone:phone},rel=>{
        rel?fun(ctx,rel):(flag=true)
    })

    // 新增用户并执行登录操作
    flag && await crud.add(ctx,Users,ctx.request.body,rel=>{
        rel?fun(ctx,rel):fail(ctx,rel,300,"登录失败")
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
