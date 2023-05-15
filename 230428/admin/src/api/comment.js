import request from '@/utils/request'

const prefix = '/comment'


// get comment list
export const getAll = (data) => request({ url: prefix, params: { ...data } })


// delete comment
export const del = (id) => request({ url: prefix + '/' + id, method: 'delete' })