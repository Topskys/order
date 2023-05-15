import request from '@/utils/request'


const prefix = '/staff'


/**
 * 新增维修师傅
 * @params {object} data 
 */
export function create(data) {
    return request({
        url: prefix,
        method: 'post',
        data
    })
}

/**
 * 维修师傅离职
 * @param {string} _id 
 * @returns 
 */
export const del = (_id) => request({ url: `${prefix}/${_id}`, method: 'delete' })


/**
 * 更新维修师傅信息
 * @param {string} _id 
 * @returns 
 */
export const update = (data) => request({ url: `${prefix}/${data._id}`, method: 'put', data })


/**
 * 查询维修师傅列表（支持带参搜索）
 * @param {object} params 
 * @returns 
 */
export function getAll(params) {
    return request({
        url: prefix,
        params
    })
}