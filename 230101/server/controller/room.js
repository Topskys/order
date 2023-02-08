const Room = require('../models/room.js')
const {responseSelf, fail, exception} = require('../util/response')
const crud = require('./crudUtil')
const dtf = require('../util/dateTimeFormat')


/**
 * 前台房间查询接口
 * @param ctx
 * @returns {Promise<void>}
 */
const queryAll = async ctx => crud.findByPagination(ctx, Room, ctx.query, {
    status: 'normal',
    $or: [{description: new RegExp(ctx.query.keyword || '')}]
});


/**
 * 新增房间
 * @param ctx
 * @returns {Promise<void>}
 */
const add = async ctx => {
    let [params, flag] = [ctx.request.body, false];

    if (!params.title || !params.room_number) return fail(ctx, undefined, 400, '名称或房间号不能为空');

    !params.origin_price && (params.origin_price = (Number(params.price) + 300).toFixed(2))

    const where = {$or: [{title: params.title}, {room_number: params.room_number}]};

    await crud.findOne(ctx, Room, where, rel => rel ? fail(ctx, undefined, 400, '该房间的名称或房间号已存在') : (flag = true));

    flag && await crud.add(ctx, Room, params);
}


/**
 * 后台房间查询接口
 * @param ctx
 * @returns {Promise<void>}
 */
const findAll = async ctx => crud.findByPagination(ctx, Room, ctx.query, {description: new RegExp(ctx.query.keyword || '')});


/**
 * 删除，将状态标为delete，以限制前台浏览
 * @param ctx
 * @returns {Promise<void>}
 */
const del = async ctx => await crud.update(ctx, Room, {_id: ctx.params.id}, {
    $set: {
        status: 'delete',
        updateTime: dtf(undefined, "YYYY-MM-DD hh:mm:ss")
    }
})


module.exports = {
    add,
    queryAll,
    findAll,
    del,
}
