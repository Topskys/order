import request from '@/utils/request'


const prefix = '/order'



/**
 * 删除订单
 * @param {string} _id 
 * @returns 
 */
export const del = (_id) => request({ url: `${prefix}/${_id}`, method: 'delete' })


/**
 * 更新订单信息
 * @param {string} _id 
 * @returns 
 */
export const update = (data) => request({ url: `${prefix}/${data._id}`, method: 'put', data })


/**
 * 完成订单，结束服务
 * @param {*} data 
 * @returns 
 */
export const serviceOver=data=>request({ url: `${prefix}/over/${data._id}`, method: 'put', data })



/**
 * 查询订单列表（支持带参搜索）
 * @param {object} params 
 * @returns 
 */
export function getAll(params) {
    return request({
        url: prefix,
        params
    })
}