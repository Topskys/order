/*
 * @Author: Topskys
 * @Date: 2023-03-28 14:29:20
 * @LastEditTime: 2023-04-06 16:25:52
 */
import request from '@/utils/request'

// URL前缀
const prefix = '/product'

/**
 * 新增或修改产品信息
 * @param {Object} data
 * @returns
 */
export function addOrEditProduct(data) {
  return request({
    url: `${prefix}/${data._id || ''}`,
    method: data._id ? 'PUT' : 'POST',
    data
  })
}

/**
 * 新增或编辑扩展信息
 * @param {Object} data
 * @returns
 */
export function addOrEditExpand(data) {
  return request({
    url: `${prefix}/expand/${data._id}`,
    method: data._id ? 'PUT' : 'POST',
    data
  })
}

/**
 * 删除产品信息
 * @param {string} data(_id)
 * @returns
 */
export function delProduct(data = '') {
  return request({
    url: `${prefix}/${data}`,
    method: 'delete',
    data
  })
}

/**
 * 获取产品编号下拉信息选项
 * @returns
 */
export const getIds = () => request({ url: `${prefix}/ids` })

/**
 * 获取产品列表信息
 * @param {object} params {page,pageSize,keyword}
 * @returns
 */
export function getProductList(params) {
  return request({
    url: prefix,
    method: 'GET',
    params
  })
}

export function addExpand(data) {
  return request({
    url: `${prefix}/expand`,
    method: 'POST',
    data
  })
}

export function delExpand(_id) {
  return request({
    url: `${prefix}/expand/${_id}`,
    method:'delete',
  })
}

export function getExpand(product_id) {
  return request({
    url: `${prefix}/expand/${product_id}`
  })
}


export function getIcons() {
  return request({
    url: `${prefix}/icons`
  })
}
