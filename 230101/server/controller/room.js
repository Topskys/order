const Room = require('../models/room.js')
const RoomDetail = require('../models/detail.js')
const {success, responseSelf, fail, exception} = require('../util/response')
const crud = require('./crudUtil')


/**
 * 新增房间
 * @param ctx
 * @returns {Promise<void>}
 */
const add = async ctx => {
    let [params, flag] = [ctx.request.body, false ];

    if(!params.title || !params.room_number){
        fail(ctx, undefined, 400, '名称或房间号不能为空')
        return;
    }
    !params.origin_price && (params.origin_price=(Number(params.price)+300).toFixed(2))

    const where={$or: [{title: params.title}, {room_number: params.room_number}]};

    await crud.findOne(ctx, Room, where, rel => rel ? fail(ctx, undefined, 400, '该房间的名称或房间号已存在') : (flag = true));

    flag && await crud.add(ctx, Room, params);
}


// const findAll = async ctx => {
//     let {page = 1, pageSize = 10,like=null} = ctx.query;
//
//     // 判断页码
//     (!page || isNaN(Number(page))) ? (page = 1) : (page = Number(page))
//
//     // 计算总页数
//     let count = 0
//     await Room.find({isFree: true,desc:like?like:null}).count().then(rel => {
//         count = rel
//     })
//     let totalPage = 0
//     count > 0 && (totalPage = Math.ceil(count / pageSize))
//
//     // 判断当前页码的范围
//     if (totalPage > 0 && page > totalPage) {
//         page = totalPage
//     } else if (page < 1) {
//         page = 1
//     }
//
//     // 计算起始位置
//     let start = (page - 1) / pageSize
//
//     await Room.find({isFree: true,desc:like?like:null})
//         .skip(start)
//         .limit(pageSize)
//         .then(rel => {
//             rel && rel.length > 0 ? responseSelf(ctx, {
//                 code: 200,
//                 msg: 'success',
//                 data: rel,
//                 page,
//                 pageSize,
//                 total: count
//             }) : fail(ctx, rel)
//         }).catch(err => {
//             ctx.body = {
//                 code: 500,
//                 msg: '查询文章时出现异常',
//                 err
//             }
//         })
// }


/**
 * pagination
 * @param ctx
 * @returns {Promise<void>}
 */
const findAll = async ctx => {
    let {page = 1, pageSize = 10, keyword = ''} = ctx.query;
    let q = {description: new RegExp(keyword)}

    // 判断页码
    !page || isNaN(Number(page)) ? (page = 1) : (page = Number(page))

    // 计算总页数
    let count = 0;
    let totalPage = 0;
    await Room.find(q).count().then(rel => {
        count = rel
    })
    count > 0 && (totalPage = Math.ceil(count / pageSize))

    // 判断当前页码的范围
    if (totalPage > 0 && page > totalPage) {
        page = totalPage
    } else if (page < 1) {
        page = 1
    }

    // 计算起始位置
    let start = (page - 1) * pageSize

    await Room.find(q)
        .skip(start)
        .limit(pageSize)
        .then(rel => {
            rel ? responseSelf(ctx, {// rel为[]时通过
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


/**
 * 获取房间详情
 * @param ctx
 * @returns {Promise<void>}
 */
const detail = async ctx => {
    let _id = ctx.params.id

    await crud.findOne(ctx, RoomDetail, {_id}, (rel) => {
        success(ctx, rel)
    })
}


module.exports = {
    add,
    findAll,
    detail,
}
