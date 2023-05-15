const crud = require('./crud')
const MsgModel = require('../models/contact')
const { fail } = require('../utils/response')



/**
 * 添加留言
 * @param {*} ctx 
 */
async function createCtt(ctx) {
    const { kind = '', content = '', contact_type = '', user_id = '' } = ctx.request.body // 类似解构 like: var object={a:1,b:2,c:3} ==>  var {a}=object then use the a todo 
    if (!kind || !contact_type || !content || !user_id) {
        fail(ctx, undefined, 400, "Invalid,请求参数错误")
        return
    } else {
        // 插入数据库（ctx,数据库模型,插入数据对象）
        await crud.add(ctx, MsgModel, ctx.request.body)
    }
}


/**
 * 删除留言
 * @param {*} ctx 
 * @returns 
 * const name=()=>{} like function name(){};
 */
const delCtt = async ctx => await crud.del(ctx, MsgModel, { _id: ctx.params.id })



/**
 * 分页获取所有留言，支持带参数搜索
 * @param {*} ctx 
 */
const getAll = async (ctx) => {
    const { keyword = '' } = ctx.query
    const regex = new RegExp(keyword, 'i') // 正则
    await crud.findByPagination(ctx, MsgModel, ctx.request.query, {
        $or: [
            { kind: regex },
            { contact_type: regex },
            { content: regex },
        ]
    })
}



/**
 * 用户获取自己所有留言历史
 * @param {*} ctx 
 */
const getUserMsg = async ctx => await crud.find(ctx, MsgModel, { user_id: ctx.params.id })





module.exports = { createCtt, delCtt, getUserMsg, getAll }