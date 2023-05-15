import request from '@/utils/request'


const prefix = '/chat'



export function create(data) {
    return request({
        url: prefix,
        method: 'post',
        data
    })
}


export const del = (_id) => request({ url: `${prefix}/${_id}`, method: 'delete' })



export const update = (data) => request({ url: `${prefix}/${data._id}`, method: 'put', data })



export function getAll(params) {
    return request({
        url: prefix,
        params
    })
}