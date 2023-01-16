const RoomDetail = require('../models/room-detail');
const {success,responseSelf, fail} = require('../util/response')
const crud = require('./crudUtil')


/**
 * 新增房间详情
 * @param ctx
 * @returns {Promise<void>}
 */
const add = async ctx => {
    let params=ctx.request.body
    await crud.add(ctx, RoomDetail, {roomId:params._id,...params})
}


/**
 * 查询房间详情
 * @param ctx
 * @returns {Promise<void>}
 */
const findById = async ctx => {
    let roomId = ctx.params.id
    await crud.findOne(ctx,RoomDetail, {roomId})
}


/**
 * 新增房间评论
 * @param ctx
 * @returns {Promise<void>}
 */
const addComment=async ctx => {
    let [params,update] =[ctx.request.body,null];

    await crud.findOne(ctx,RoomDetail,{roomId:params.roomId},(rel)=>{
        let createTime=`${new Date().getFullYear()}-${new Date().getMonth()+1}-${new Date().getDate()}`
        rel.comments.push({...params,createTime:createTime})
        update=rel
    })

    await crud.update(ctx,RoomDetail,{roomId:params.roomId},update)
}





module.exports={
    add,
    findById,
    addComment,
}
