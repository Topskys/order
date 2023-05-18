const Room = require('../models/room.js')
const Detail = require('../models/detail.js')
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
    let [params, flag, detail] = [ctx.request.body, false, null];

    detail = {feature: params.feature, slides: params.slides, explain: params.explain}

    if (!params.title || !params.room_number) return fail(ctx, undefined, 400, '名称或房间号不能为空');
    if(detail.explain.length>3 || detail.slides.length>3) return fail(ctx, undefined, 400, '轮播或图片描述最可上传3张图片');

    !params.origin_price && (params.origin_price = (Number(params.price) + 300).toFixed(2))
    const where = {$or: [{title: params.title}, {room_number: params.room_number}]};


    await crud.findOne(ctx, Room, where, rel => rel ? fail(ctx, undefined, 400, '该房间的标题或房间号已存在') : (flag = true));

    flag && await crud.add(ctx, Room, params, rel => rel ? (params = rel || null) : fail(ctx, undefined, 500, '添加时出现异常'));


    flag && params && detail && await crud.add(ctx, Detail, {...detail, roomId: params._id});
}


/**
 * 后台房间查询接口
 * @param ctx
 * @returns {Promise<void>}
 */
const findAll = async ctx => {
    let {keyword='',title=''}=ctx.query
    title && (keyword=title)
    const rep=new RegExp(keyword,'i')

    await crud.findByPagination(ctx, Room, ctx.query, {
        $or:[
            { title: rep },
            { room_number: rep },
            {description: rep},
        ]
    });
}


/**
 * 删除，将状态标为delete，以限制前台浏览
 * @param ctx
 * @returns {Promise<void>}
 */
const del = async ctx => await crud.del(ctx, Room, {_id: ctx.params.id} )





/**
 * 更新
 * @param ctx
 * @returns {Promise<void>}
 */
const update = async ctx => await crud.update(ctx, Room, {_id: ctx.params.id}, {
        ...ctx.request.body,
        updateTime: dtf(undefined, "YYYY-MM-DD hh:mm:ss")
})





module.exports = {
    add,
    queryAll,
    findAll,
    del,
    update
}
