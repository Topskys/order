/**
 * 检查是否登录
 * @param {Function} cb 回调函数
 * @param {String} redirect 重定向
 * @param {String} rediType 重定向类型
 */
export default function checkAuth(cb, redirect='index',rediType='tab') {
    const token = wx.getStorageSync('token')
    token ? cb && cb() : wx.navigateTo({
        url: `/pages/login/login?redirect=${redirect}$rediType=${rediType}`,
    })
}