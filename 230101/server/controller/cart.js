const Carts =require('../models/cart');
const Rooms =require('../models/room');
const crud=require('./crudUtil');
const {success,responseSelf,exception,fail} =require("../util/response");
const dtf=require('../util/dateTimeFormat');



/**
 * 购物车新增商品
 * @param ctx
 * @returns {Promise<void>}
 */
const add=async ctx =>{
    let params=ctx.request.body;
    let [update,flag]=[null,false];

    await Carts.findOne({phone:params.phone,roomId:params.roomId,status:'0'})
        .then(rel=>{ // 条件并列查询 ---- roomId and status
        if(rel){
            rel.number = (isNaN(rel.number) ? rel.number : Number(rel.number))+1
            rel.updateTime=dtf()
            update=rel
        }else{
            flag=true
        }
    }).catch(err=>{
        exception(ctx,err)
    })
    !flag && await crud.update(ctx,Carts,{_id:update._id},update)


    if(flag){

        params={
            ...params,
            roomNumber:`${Date.now()}`.slice(9) // 房间号
        }

        await crud.findOne(ctx,Rooms,{_id:params.roomId},rel=>{
            params.room=rel
        })

        await crud.add(ctx,Carts, params,rel=>{
            success(ctx,rel)
        })
    }
}


/**
 * 删除购物车商品
 * @param ctx
 * @returns {Promise<void>}
 */
const del=async ctx =>{
    await crud.del(ctx,Carts,{_id:ctx.params.id})
}


/**
 * 更新购物车商品
 * @param ctx
 * @returns {Promise<void>}
 */
const update=async ctx =>{
    let params=ctx.request.body;

    params.updateTime=dtf()

    await crud.update(ctx,Carts,{_id:params._id},params)
}


/**
 * 查询购物车的所有商品
 * @param ctx
 * @returns {Promise<void>}
 */
const findAll=async ctx =>{
    let {page = 1, pageSize = 10,phone=null} = ctx.query;

    if(!phone) return fail(ctx,null,400,'请重新登录')

    // 判断页码
    !page || isNaN(Number(page)) ? (page = 1) : (page = Number(page))

    // 计算总页数
    let count = 0
    await Carts.find({phone}).count().then(rel => {
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

    await Carts.find({phone}).skip(start).limit(pageSize).then(rel => {
            responseSelf(ctx, {
                code: 200,
                msg: 'success',
                data: rel,
                page,
                pageSize,
                total: count
            })
        }).catch(err => {
            exception(ctx,err)
        })

}


/**
 * 通过_id查询房间订单信息
 * @param ctx
 * @returns {Promise<void>}
 */
const findById=async ctx =>{
    await Carts.findOne({_id: ctx.params.id}).then(rel=>{
        success(ctx,rel)
    })
}


/**
 * 支付订单
 * @param ctx
 */
const pay=async ctx =>{
    let [params,update]=[ctx.request.body,null];

    await crud.findOne(ctx,Carts,{_id: params._id,status:'0'},rel=>{
        if(rel){
            rel.total=params.total
            rel.payType=params.payType
            rel.status='1' // 待入住
            rel.updateTime=dtf()
            update=rel
        }else{
            fail(ctx,rel,300,'支付失败')
        }
    })

    update && await crud.update(ctx,Carts,{_id:update._id},update,rel=>{
        //success(ctx,rel,null,'支付成功')
        responseSelf(ctx,{
            code:rel?200:300,
            msg:rel?'支付成功':'支付失败',
            data: {
                ...rel,
                price:update.total,// 支付金额
                _id:update._id,// 订单编号
                receiver:'海健大酒店',// 收款账户
                createTime:dtf(Date.now(),"YYYY-MM-DD hh:mm:ss"),// 下单时间
                payType: update.payType,// 支付方式
                roomNumber:update.roomNumber, // 房间号
            }
        })
    })
}



module.exports={
    add,
    del,
    update,
    findAll,
    findById,
    pay,
}
