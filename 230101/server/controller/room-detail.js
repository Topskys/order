const RoomDetail = require('../models/room-detail');
const Carts =require('../models/cart');
const {success,responseSelf, fail} = require('../util/response')
const crud = require('./crudUtil')
const dtf=require('../util/dateTimeFormat')


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
    let [params,update,obj] =[ctx.request.body,null,null];

    await crud.findOne(ctx,Carts,{_id:params.orderId},rel=>{
        rel.status='4'
        obj= rel
    });
    await crud.update(ctx,Carts,{_id:params.orderId},obj)


    await crud.findOne(ctx,RoomDetail,{roomId:params.roomId},(rel)=>{
        rel.comments.push({...params,createTime:dtf()})
        update=rel
    })
    await crud.update(ctx,RoomDetail,{roomId:params.roomId},update)
}





module.exports={
    add,
    findById,
    addComment,
}
