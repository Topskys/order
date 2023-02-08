const Loses = require('../models/lose')
const crud = require('../controller/crudUtil')
const {success, responseSelf, fail, exception} = require('../util/response')
const dtf = require('../util/dateTimeFormat');




// 新增失物
const add = async ctx => await crud.add(ctx, Loses, ctx.request.body);


// 领取失物
const received = async ctx => {
    let [{receiver = '' },_id] = [ctx.request.body,ctx.params.id];

    if (!receiver) {
        fail(ctx, null, 400, '领取人信息不能为空')
        return;
    }

    await crud.update(ctx, Loses, {_id}, {
        $set: {
            status: 'received',
            receiver:receiver,
            updateTime: dtf(Date.now(), "YYYY-MM-DD hh:mm:ss")
        }
    })
}



// 更新失物信息
const update = async ctx => {
    let params = ctx.request.body;
    params = {
        ...params,
        updateTime: dtf(Date.now(), "YYYY-MM-DD hh:mm:ss")
    }
    await crud.update(ctx, Loses, {_id: params._id}, params)
}


// 查询所有
const findAll = async ctx => {
    let {page = 1, pageSize = 10, keyword = ''} = ctx.query;
    let query = {title: new RegExp(keyword)}

    // 判断页码
    !page || isNaN(Number(page)) ? (page = 1) : (page = Number(page))


    // 计算总页数
    let count = 0;
    let totalPage = 0;
    await Loses.find(query).count().then(rel => (count = rel))
    count > 0 && (totalPage = Math.ceil(count / pageSize))


    // 判断当前页码的范围
    if (totalPage > 0 && page > totalPage) {
        page = totalPage
    } else if (page < 1) {
        page = 1
    }

    // 计算起始位置
    let start = (page - 1) * pageSize

    await Loses.find(query).skip(start).limit(pageSize).then(rel => {
        rel ? responseSelf(ctx, {
            code: 200,
            msg: 'success',
            data: rel,
            page,
            pageSize,
            total: count
        }) : fail(ctx, rel)
    }).catch(err => {
        exception(ctx, err)
    })
}




module.exports = {
    add,
    received,
    update,
    findAll,
}
