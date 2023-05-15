import request from './request'

/**
 * 鉴权
 * @param {Function} cb 回调函数
 * @param {String} redirect 重定向
 * @param {String} rediType 重定向类型
 */
export default function checkAuth(cb, redirect='index',rediType='tab') {
    const token = wx.getStorageSync('token')
    token ? cb && cb() : wx.navigateTo({
        url: `/pages/login/login?redirect=${redirect}&rediType=${rediType}`,
    })
}

/**
 * 登录
 * @param {Object} data 登录表单数据
 * @param {String} redirect 重定向 
 */
export function login(data, redirect) {
    request({
        url: '/user/login',
        method: 'post',
        data
    }).then(res => wx.navigateTo({
        url: `/pages/${redirect}/${redirect}`,
    }))
}


/**
 * 注册
 * @param {Object} data 注册表单数据
 * @param {String} redirect 重定向
 */
export function register(data, redirect = 'login') {
    request({
        url: 'user/reg',
        method: 'post',
        data
    }).then(res => {
        wx.showToast({
            title: res.msg,
            icon: 'success',
            complete: (res) => {
                wx.navigateTo({
                    url: `/pages/${redirect}/${redirect}`,
                })
            }
        })
    })
}


/**
 * 获取验证码接口
 * @param {Object} data 获取验证码的根据
 */
export function getCode(data) {
    return request({
        url: '/user/code',
        method:'post',
        data
    })
}



/**
 * 退出登录
 */
export function logout() {
    wx.removeStorageSync('token')
    wx.removeStorageSync('userInfo')
    // request({
    //     url: 'user/logout'
    // }).then(({
    //     msg
    // }) => {
    //     wx.showToast({
    //         title: msg,
    //         icon: 'success',
    //         success: () => {
                wx.navigateTo({
                    url: `/pages/login/login`,
                })
    //         },
    //     })
    // })
}