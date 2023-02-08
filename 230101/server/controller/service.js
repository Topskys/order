const crud =require('./crudUtil');
const Services = require('../models/service');
const {fail}=require('../util/response');
const dtf = require('../util/dateTimeFormat');




// 房间清洁
const clear=async ctx =>{
    let [params,update]=[ctx.request.body,null];

    if(!params.room_number||!params.userId) return fail(ctx,null,400,'请联系客服或先入住登记')

    await crud.findOne(ctx,Services,{userId:params.userId},rel=>(update=rel))

    await (update?crud.update(ctx,Services,{_id:update._id}): crud.add(ctx,Services,{
        ...params,
        order:params.order||'中午',
        status:'clear',
        updateTime:dtf(undefined,"YYYY-MM-DD hh:mm:ss")
    }))
}


// 更新服务信息
const update=async ctx=> await crud.update(ctx,Services,{_id:ctx.params.id},{...ctx.request.body,updateTime:dtf(undefined,"YYYY-MM-DD hh:mm:ss")});


// 查询所有服务记录
const findAll =async ctx => await crud.findByPagination(ctx,Services,ctx.query,{phone:new RegExp(ctx.query.keyword||'')});







module.exports ={
    clear,
    update,
    findAll,
}
