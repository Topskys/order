import request from '@/utils/request'


const prefix = '/disc'


/**
 * 新增福利
 * @params {object} data 
 */
export function createDisc(data) {
    return request({
        url: prefix,
        method: 'post',
        data
    })
}

/**
 * 删除福利
 * @param {string} _id 
 * @returns 
 */
export const delDisc = (_id) => request({ url: `${prefix}/${_id}`, method: 'delete' })


/**
 * 删除福利
 * @param {string} _id 
 * @returns 
 */
export const updateDisc = (data) => request({ url: `${prefix}/${data._id}`, method: 'put', data })


/**
 * 查询福利列表（支持带参搜索）
 * @param {object} params 
 * @returns 
 */
export function getAll(params) {
    return request({
        url: prefix,
        params
    })
}