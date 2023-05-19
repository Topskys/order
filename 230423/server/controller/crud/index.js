const { success, self, fail, exception } = require('../../utils/response')


// 增删改查类
class CRUD {


    /**
     * 新增
     * @param ctx
     * @param model
     * @param params
     * @param cb
     * @returns {*|Promise<any>}
     */
    add(ctx, model, params, cb = null) {
        return model.create(params).then(rel => {
            cb ? cb(rel) : success(ctx, rel, 200, "添加成功")
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
    del(ctx, model, where, cb = null) {
        return model.findOneAndDelete(where).then(rel => {
            cb ? cb(rel) : success(ctx, rel, 200, "成功移除")
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
    update(ctx, model, where, params, cb = null) {
        return model.updateOne(where, params).then(rel => {
            cb ? cb(rel) : rel.modifiedCount > 0 ? success(ctx, rel, 200, "修改成功") : fail(ctx, rel, 400, "修改失败")
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
    find(ctx, model, where, cb = null) {
        return model.find(where).then(rel => {
            cb ? cb(rel) : success(ctx, rel, 200, "查询成功")
        }).catch(err => {
            exception(ctx, err)
        })
    }




    /**
     * 条件查询
     * @param ctx
     * @param model
     * @param where
     * @returns {*|Promise<any>}
     */
    findOne(ctx, model, where, cb = null) {
        return model.findOne(where).then(rel => {
            cb ? cb(rel) : success(ctx, rel, 200, "查询成功")
        }).catch(err => {
            exception(ctx, err)
        })
    }




    /**
     * 分页查询，带条件查询（可选）
     * @param ctx
     * @param model
     * @param request
     * @param where
     * @param cb
     * @returns {Promise<void>}
     */
    async findByPagination(ctx, model, request, where, cb = null) {
        let { page = 1, pageSize = 10 } = request;
        // 判断页码
        !page || isNaN(Number(page)) ? (page = 1) : (page = Number(page))

        // 计算总页数
        let count = 0;
        let totalPage = 0;
        await model.find(where).count().then(rel => (count = rel))
        count > 0 && (totalPage = Math.ceil(count / pageSize))

        // 判断当前页码的范围
        if (totalPage > 0 && page > totalPage) {
            page = totalPage
        } else if (page < 1) {
            page = 1
        }

        // 计算起始位置
        let start = (page - 1) * pageSize

        await model.find(where).sort({ "createdAt": -1 }).skip(start).limit(pageSize).then(rel => {
            if (rel) {
                cb ? cb({ rel, total: count }) : (ctx.body = {
                    code: 200,
                    msg: 'success',
                    data: rel,
                    page,
                    pageSize,
                    total: count
                })
            } else {
                fail(ctx, null)
            }
        }).catch(err => {
            exception(ctx, err)
        })
    }
}



module.exports = new CRUD()
