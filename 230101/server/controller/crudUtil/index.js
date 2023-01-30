/*
* CRUD模块
*/
const {success, exception,fail} = require('../../util/response')




/**
 * 新增
 * @param ctx
 * @param model
 * @param params
 * @returns {*}
 * /**+enter
 */
const add = (ctx, model, params,cb=null) => {
    return model.create(params).then(rel => {
        cb?cb(rel) : success(ctx, rel)
    }).catch(err => {
        exception(ctx, err)
    })
}


/**
 * 删除
 * @param ctx
 * @param model
 * @param where
 * @returns {*|Promise<any>}
 */
const del = (ctx, model, where,cb=null) => {
    return model.findOneAndDelete(where).then(rel => {
        cb?cb(rel) : success(ctx, rel)
    }).catch(err => {
        exception(ctx, err)
    })
}


/**
 * 更新
 * @param ctx
 * @param model
 * @param where
 * @param params
 * @returns {*|Promise<any>}
 */
const update = (ctx, model, where, params,cb=null) => {
    return model.updateOne(where, params).then(rel => {
        cb?cb(rel) : rel.modifiedCount>0 ?success(ctx, rel):fail(ctx,rel)
    }).catch(err => {
        exception(ctx, err)
    })
}


/**
 * 查询
 * @param ctx
 * @param model
 * @param where
 * @returns {*|Promise<any>}
 */
const findAll = (ctx,model, where,cb=null) => {
    return model.find(where).then(rel => {
        cb?cb(rel) : success(ctx, rel)
    }).catch(err => {
        exception(ctx,err)
    })
}



/**
 * 条件查询
 * @param ctx
 * @param model
 * @param where
 * @returns {*|Promise<any>}
 */
const findOne = (ctx, model, where,cb=null) => {
    return model.findOne(where).then(rel => {
        cb?cb(rel) : success(ctx, rel)
    }).catch(err => {
        exception(ctx, err)
    })
}





module.exports = {
    add,
    del,
    update,
    findAll,
    findOne
}
