/*
 * @Author: Topskys
 * @Date: 2023-02-24 11:16:16
 * @LastEditTime: 2023-03-13 15:24:30
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
export function getInfo(email) {
  return http({
    url: '/users/verify',
    method: 'post',
    data:{
      email
    }
  })
}




// 退出登录
export const logout = (email) => http({ url: '/users/logout',method: 'post',data:{email: email} })
