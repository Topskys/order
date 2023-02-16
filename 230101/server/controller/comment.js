const Comments = require('../models/comment.js')
const Carts = require('../models/cart.js')
const {fail} = require('../util/response')
const dtf = require('../util/dateTimeFormat')
const crud = require('./crudUtil')


// 顾客添加房间评论
const add = async ctx => {
    let [params,flag]=[ctx.request.body,false];
    console.log(params)

    // 数据效验
    // for (let key in params) {
    //     if(["room_number","content","userId","roomId"].includes(key)){
    //         console.log(params[key])
    //         if (!params[key]) {
    //             console.log(key)
    //             flag=false;
    //             fail(ctx, undefined, 400, `${key} is required`);
    //             return ;
    //         }else{
    //             flag=true;
    //         }
    //     }else {
    //         flag=true;
    //         break;
    //     }
    // }
    // flag && console.log("YY")
    console.log("YY",params)

    if (!params.content) return fail(ctx, undefined, 400, '评论内容不能为空');
    if (!params.roomId) return fail(ctx, undefined, 400, '稍后再试');
    if (!params.userId) return fail(ctx, undefined, 400, '稍后再试');
    if (!params.room.room_number) return fail(ctx, undefined, 400, '稍后再试');

    let _id=params._id;
    params={
        content:params.content,
        satisfaction:params.satisfaction,
        userId:params.userId,
        nickName:params.nickName,
        roomId:params.roomId,
        room_number:params.room.room_number,
    }

    await crud.add(ctx, Comments, params,rel=>(flag=true))

    flag && await crud.update(ctx, Carts, {_id},{$set:{status: '4',updateTime:dtf(undefined,"YYYY-MM-DD hh:mm:ss")}});
}



// 永久删除评论
const del = async ctx => await crud.del(ctx, Comments, {_id:ctx.params.id})



// 前台查看房间的所有评论
const queryAll = async ctx => crud.findByPagination(ctx,Comments,ctx.query,{roomId: ctx.params.id});



// 后台查看所有评论
const findAll = async ctx => crud.findByPagination(ctx,Comments,ctx.query,{content: new RegExp(ctx.query.keyword||'')});






module.exports = {
    add,
    del,
    findAll,
    queryAll,
}
