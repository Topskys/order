// import request from '@/utils/request'

// export function login(data) {
//   return request({
//     url: '/vue-admin-template/user/login',
//     method: 'post',
//     data
//   })
// }

// export function getInfo(token) {
//   return request({
//     url: '/vue-admin-template/user/info',
//     method: 'get',
//     params: { token }
//   })
// }

// export function logout() {
//   return request({
//     url: '/vue-admin-template/user/logout',
//     method: 'post'
//   })
// }


import http from '@/utils/http'



/**
 * 登录
 * @param {*} data 
 * @returns 
 */
export function login(data) {
  return http({
    url: '/admins/login',
    method: 'post',
    data
  })
}



/**
 * 验证登录
 * @param {*} token 
 * @returns 
 */
export function getInfo(token) {
  return http({
    url: '/admins/verify',
    method: 'post',
  })
}



/**
 * 退出登录
 * @returns 
 */
export function logout() {
  return request({
    url: '/admins/logout',
    method: 'post'
  })
}
