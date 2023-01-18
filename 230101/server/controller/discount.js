const Discounts =require('../models/discount');
const Users =require('../models/user');
const crud=require('./crudUtil');
const {success,responseSelf,exception,fail} =require("../util/response");
const dtf=require('../util/dateTimeFormat');



/**
 * 新增优惠劵
 * @param ctx
 * @returns {Promise<void>}
 */
const add=async ctx =>{
    let[ params,flag]=[ctx.request.body,false];
    params.title= Date.now() // dtf()
    // if(!params.discount) return fail(ctx,null,300,"优惠劵金额不能为空")

    await crud.findOne(ctx,Discounts,{title:params.title},rel=>{
        rel?fail(ctx,rel,300,'同名优惠劵已经存在'):(flag=true)
    })
    flag && await crud.add(ctx,Discounts, params)
}


/**
 * 删除购物车商品
 * @param ctx
 * @returns {Promise<void>}
 */
const del=async ctx => await crud.del(ctx,Discounts,{_id:ctx.params.id})


/**
 * 更新优惠劵
 * @param ctx
 * @returns {Promise<void>}
 */
const update=async ctx =>{
    let params=ctx.request.body;

    params.updateTime=dtf()

    await crud.update(ctx,Discounts,{_id:params._id},params)
}


/**
 * 查询所有优惠劵
 * @param ctx
 * @returns {Promise<void>}
 */
const findAll=async ctx =>{
    let {page = 1, pageSize = 10} = ctx.query;

    // 判断页码
    !page || isNaN(Number(page)) ? (page = 1) : (page = Number(page))

    // 计算总页数
    let count = 0
    await Discounts.find().count().then(rel => (count = rel))
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

    await Discounts.find().skip(start).limit(pageSize).then(rel => {
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
 * 领取优惠劵
 * @param ctx
 */
const take=async ctx =>{
    let [params,update,update2]=[ctx.request.body,null,null];

    await crud.findOne(ctx,Discounts,{_id: params._id},rel=>{
        if(rel && rel.stock > 0 ){
            rel.stock=rel.stock-1
            rel.updateTime=dtf()
            update=rel
        }else{
            fail(ctx,rel,300,'领取失败')
        }
    })

    // 更新用户信息
    await crud.findOne(ctx,Users,{_id: params.userId},rel=>{
        if(rel){
            rel.discounts.push(params.discount)
            rel.updateTime=dtf()
            update2=rel
        }else{
            fail(ctx,rel,300,'领取失败')
        }
    })
    update2 && await crud.update(ctx,Users,{_id:params.userId},update2)

    // 更新优惠劵信息
    update && await crud.update(ctx,Discounts,{_id:update._id},update)
}



module.exports={
    add,
    del,
    update,
    findAll,
    take,
}
