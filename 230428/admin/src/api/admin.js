/*
 * @Author: Topskys
 * @Date: 2023-03-27 14:17:18
 * @LastEditTime: 2023-04-03 15:10:23
 */
import request from '@/utils/request'

const prefix = '/admin'


export function login(data) {
    return request({
        url: `${prefix}/login`,
        method: 'post',
        data
    })
}

export const getInfo = () => request({ url: `${prefix}/info` })


export const logout = () => request({ url: `${prefix}/logout` })


export function register(data) {
    return request({
        url: `${prefix}/register`,
        method: 'post',
        data
    })
}

