/*
 * @Author: Topskys
 * @Date: 2023-02-24 11:16:16
 * @LastEditTime: 2023-03-23 11:57:51
 * @LastEditors: Please set LastEditors
 * @Description: 
 */
import http from '@/utils/http'



// 登录
export function login(data) {
  return http({
    url: '/users/login',
    method: 'post',
    data
  })
}



// 验证登录
export const getInfo = () => http({ url:"/users/verify"})


// 退出登录
export const logout = () => http({ url: '/users/logout'})
