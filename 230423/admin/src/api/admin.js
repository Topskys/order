import http from '@/utils/http'



/**
 * 管理员登录
 * @param {*} data {username,password}
 * @returns 
 */
export function login(data) {
    return http({
        url: '/admin/login',
        method: 'post',
        data
    })
}



/**
 * 获取用户信息
 * @returns 
 */
export function getInfo() {
    return http({
        url: '/admin/verify',
    })
}



/**
 * 退出登录
 * @returns 
 */
export function logout() {
    return http({
        url: '/admin/logout',
    })
}
