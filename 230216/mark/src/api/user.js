/*
 * @Author: Topskys
 * @Date: 2023-02-24 11:16:16
 * @LastEditTime: 2023-02-24 23:34:49
 * @LastEditors: Topskys
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
export function getInfo() {
  return http({
    url: '/users/verify',
    method: 'post',
  })
}




// 退出登录
export const logout = () => http({ url: '/users/logout' })
