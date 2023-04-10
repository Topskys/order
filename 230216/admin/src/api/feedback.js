import request from '@/utils/request'

const prefix = '/feedback'

export const getAll = (params) => request({ url: `${prefix}`, params })

export const del = (id) => request({ url: `${prefix}/${id}`, method: "delete" })

export const create = (data) => request({ url: prefix, method: "post",data })