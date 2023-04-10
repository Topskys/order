import request from '@/utils/request'

const prefix = '/admin'

export const login = (data) => request({ url: `${prefix}/login`, method: "post", data })

export const verify = () => request({ url: `${prefix}/verify` })

export const logout = () => request({ url: `${prefix}/logout` })