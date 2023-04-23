/*
 * @Author: Topskys
 * @Date: 2023-04-08 22:39:33
 * @LastEditTime: 2023-04-08 22:39:53
 */
import request from '@/utils/request'

const prefix = '/docs'


export const getAll= (params) => request({ url: `${prefix}`, params })

export const del = (_id) => request({ url: `${prefix}/${_id}`, method: "delete" })

export const edit = (_id) => request({ url: `${prefix}/${_id}`, method: 'post', data, })