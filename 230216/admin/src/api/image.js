/*
 * @Author: Topskys
 * @Date: 2023-04-09 14:01:26
 * @LastEditTime: 2023-04-09 15:16:53
 */
import request from '@/utils/request'

const prefix = '/image'

export const getAll = (params) => request({ url: `${prefix}`, params })

export const del = (data) => request({ url: `${prefix}`, method: "delete", data })///${data.folder}/${data.file}