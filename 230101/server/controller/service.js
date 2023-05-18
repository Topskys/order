const crud = require('./crudUtil');
const Services = require('../models/service');
const { fail } = require('../util/response');
const dtf = require('../util/dateTimeFormat');




// 房间清洁
const clear = async ctx => {
    const { room_number = '', phone = '', order = '', nickName = '', userId = '' } = ctx.request.body
    if (!room_number || !phone || !order || !nickName || !userId) return fail(ctx, undefined, 400, '请稍后重试');

    await crud.add(ctx, Services, {
        ...ctx.request.body,
        order: ctx.request.body.order || '中午',
        status: 'clear',
        updateTime: dtf(undefined, "YYYY-MM-DD hh:mm:ss")
    })
}


// 更新服务信息
const update = async ctx => await crud.update(ctx, Services, { _id: ctx.params.id }, { ...ctx.request.body, updateTime: dtf(undefined, "YYYY-MM-DD hh:mm:ss") });


// 查询所有服务记录
const findAll = async ctx => await crud.findByPagination(ctx, Services, ctx.query, { phone: new RegExp(ctx.query.keyword || '') });







module.exports = {
    clear,
    update,
    findAll,
}
