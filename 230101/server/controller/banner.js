const Banners =require('../models/banner')
const crud = require('../controller/crudUtil')
const {success,responseSelf, fail,exception} = require('../util/response')



/**
 * 新增banner
 * @param ctx
 * @returns {Promise<void>}
 */
const add=async ctx=>{
    let {imgUrl}=ctx.request.body
    if(!imgUrl) {
        fail(ctx,null,300,'图片地址不能为空')
        return
    }
    await crud.add(ctx,Banners,ctx.request.body)
}


/**
 * 删除banner
 * @param ctx
 * @returns {Promise<void>}
 */
const del=async ctx=>{
    let {_id}=ctx.request.body
    await crud.del(ctx,Banners,{_id})
}


/**
 * 删除banner
 * @param ctx
 * @returns {Promise<void>}
 */
const update=async ctx=>{
    let params=ctx.request.body
    let {_id}=ctx.request.body
    await crud.update(ctx,Banners,{_id},params)
}


/**
 * 查询banner
 * @param ctx
 * @returns {Promise<void>}
 */
const find=async ctx =>{
    await crud.findAll(ctx,Banners)
}





module.exports={
    add,
    find,
    del,
    update,
}
