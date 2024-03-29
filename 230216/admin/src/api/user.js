import request from '@/utils/request'

const prefix = '/users'

export const getCode = (data) => request({ url: `${prefix}/code`, method: 'post', data })

export const register = (data) => request({ url: `${prefix}/register`, method: 'POST', data })

export const getUsers = (params) => request({ url: `${prefix}`, params })

export const del = (_id) => request({ url: `${prefix}/${_id}`, method: "delete" })

export const create = (data) => request({ url: prefix, method: 'post', data, })

export const edit = (data) => request({ url: `${prefix}/${data._id}`, method: 'put', data, })