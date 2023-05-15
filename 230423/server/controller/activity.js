const crud = require('./crud')
const ActivityModel = require('../models/activity')
const UserModel = require('../models/user')
const { isExpired } = require("../utils/jwt")
const { success, self, fail } = require('../utils/response')



/**
 * 添加福利（优惠劵）
 * @param {*} ctx 
 */
async function createAct(ctx) {
    let isHas = false
    const { title = '' } = ctx.request.body // 类似解构 like: var object={a:1,b:2,c:3} ==>  var {a}=object then use the a todo 

    // 检查该标题是否已经存在
    await crud.find(ctx, ActivityModel, { title: title }, function (rel) {
        if (rel && rel.length) { // rel && rel.length>0
            isHas = true
            return fail(ctx, undefined, 400, '该标题已经存在！')
        } else {
            isHas = false
        }
    })

    // 插入数据库（ctx,数据库模型,插入数据对象）
    !isHas && await crud.add(ctx, ActivityModel, ctx.request.body) // true && todo
}


/**
 * 删除福利，可用于后台管理员或支付时扣除
 * @param {*} ctx 
 * @returns 
 * const name=()=>{} like function name(){};
 */
const delAct = async ctx => await crud.del(ctx, ActivityModel, { _id: ctx.params.id })


/**
 * 更新优惠劵数据
 * @param {*} ctx 
 * @returns 
 */
const updateAct = async (ctx) => {
    let temp // undefined
    const { id = '' } = ctx.params
    if (!id) {
        return fail(ctx, undefined, 400, "请求参数错误")
    }

    // Determine whether the goods exist
    await crud.findOne(ctx, ActivityModel, { _id:id }, rel => rel ? (temp = rel) : fail(ctx, undefined, 400, "该商品不存在"))

    // update database
    await crud.update(ctx, ActivityModel, { _id: temp._id.toString() || id }, ctx.request.body, function (rel) {
        if (rel && rel.modifiedCount > 0) {
            return success(ctx, rel, undefined, "修改成功")
        } else {
            return self(ctx, {
                code: 200,
                data: rel,
                msg: "已修改"
            })
        }
    })
}


/**
 * 分页获取所有优惠劵，支持带参数搜索
 * @param {*} ctx 
 */
const getActAll = async (ctx) => {
    const { keyword = '' } = ctx.query
    const regex = new RegExp(keyword, 'i') // 正则
    await crud.findByPagination(ctx, ActivityModel, ctx.request.query, {
        $or: [ // query or
            { title: regex },
            { end_time: regex },
        ]
    })
}



/**
 * 小程序端获取所有优惠劵
 * @param {*} ctx 
 */
const getActList = async (ctx) => await crud.find(ctx, ActivityModel, ctx.request.query)


/**
 * 用户领取优惠劵
 * @param {*} ctx 
 */
async function getDiscount(ctx) {
    let disc, user
    const { id = '' } = ctx.params
    const info = await isExpired(ctx) // 获取用户登录信息

    // check discount info
    await crud.findOne(ctx, ActivityModel, { _id: id }, function (rel) {
        if (rel) {
            disc = rel
        } else {
            return fail(ctx, rel, 400, "领取失败")
        }
    })

    // get user info
    await crud.findOne(ctx, UserModel, { _id: info._id.toString() }, function (rel) {
        if (rel) {
            user = rel
        } else {
            return fail(ctx, rel, 400, "领取失败")
        }
    })

    // 该优惠劵是否已经被当前用户领取
    let isHas = false
    const arr = user.discounts || []
    arr.forEach((item) => id === item._id + '' && (isHas = true))

    if (isHas) {
        ctx.body = {
            code: 200,
            msg: "您已领取"
        }
    } else {
        if (Number(disc.count) > 0) {
            // update user and activity data
            let flag = false
            await crud.update(ctx, UserModel, { _id: user._id.toString() }, {
                $set: {
                    discounts: [...user.discounts, disc]
                }
            }, async function (rel) {
                flag = true
            })
            if (flag) {
                await crud.update(ctx, ActivityModel, { _id: disc._id.toString() }, {
                    $set: {
                        count: parseInt(Number(disc.count) - 1)
                    }
                }, function (rel) {
                    ctx.body = {
                        code: 200,
                        msg: "领取成功"
                    }
                })
            } else {
                ctx.body = {
                    code: 200,
                    msg: "领取失败"
                }
            }
        } else {
            ctx.body = {
                code: 200,
                msg: "优惠劵被领取完了"
            }
        }
    }
}




// commonJS规范导出
module.exports = {
    createAct,
    delAct,
    updateAct,
    getActList,
    getActAll,
    getDiscount
}