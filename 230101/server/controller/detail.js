const Detail = require('../models/detail');
const Carts = require('../models/cart');
const validate = require('../util/validate')
const crud = require('./crudUtil')
const dtf = require('../util/dateTimeFormat')


/**
 * 新增房间详情
 * @param ctx
 * @returns {Promise<void>}
 */
const add = async ctx => {
    let params = ctx.request.body
    await crud.add(ctx, Detail, {roomId: params._id, ...params})
}


/**
 * 查询房间详情
 * @param ctx
 * @returns {Promise<void>}
 */
const findById = async ctx => await crud.findOne(ctx, Detail, {roomId:ctx.params.id})


/**
 * 新增房间评论
 * @param ctx
 * @returns {Promise<void>}
 */
const addComment = async ctx => {
    let [params, update, obj] = [ctx.request.body, null, null];

    await crud.findOne(ctx, Carts, {_id: params.orderId}, rel => {
        rel.status = '4'
        obj = rel
    });
    await crud.update(ctx, Carts, {_id: params.orderId}, obj)


    await crud.findOne(ctx, Detail, {roomId: params.roomId}, (rel) => {
        rel.comments.push({...params, createTime: dtf()})
        update = rel
    })
    await crud.update(ctx, Detail, {roomId: params.roomId}, update)
}


/**
 * 新增或更新房间详情
 * @param ctx
 * @returns {Promise<void>}
 */
const addOrUpdate = async ctx => {
    let params= ctx.request.body;

    // 数据效验----判空
    // for (const key in params) {
    //     if(key.includes('_id')){
    //         break
    //     }else{
    //         console.log('p--',key,params[key],validate.isEmpty(params[key]))
    //         if(!validate.isEmpty(params[key])){
    //             return;
    //         }
    //     }
    // }

    // _id 存在，则更新详情（出评论外），反之新增详情
    await params._id ? crud.update(ctx, Detail, {_id:params._id}, {
        $set: {
            slides:params.slides,
            description:params.description,
            feature:params.feature,
            updateTime: dtf(undefined, "YYYY-MM-DD hh:mm:ss")
        }
    }) : crud.add(ctx, Detail, params)
}




module.exports = {
    add,
    findById,
    addComment,
    addOrUpdate,
}
