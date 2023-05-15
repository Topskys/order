import request from '@/utils/request'

const prefix = '/user'


/**
 * 获取用户列表
 * @param {Object} params 
 * @returns 
 */
export const getUserList = (params) => request({ url: prefix, params })



/**
 * 新增用户
 * @param {object} data 
 * @returns 
 */
export function create(data) {
  return request({
    url: prefix ,
    method: 'POST',
    data
  })
}


/**
 * 修改用户信息
 * @param {object} data 
 * @returns 
 */
export function update(data) {
  return request({
    url: `${prefix}/${data._id}`,
    method: 'PUT',
    data
  })
}


/**
 * 删除用户信息
 * @param {String} _id 
 * @returns 
 */
export const delUser = (_id) => request({ url: `${prefix}/${_id}`, method: 'DELETE' })