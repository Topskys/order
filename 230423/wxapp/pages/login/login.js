// pages/login/login.js
import request from '../../utils/request.js'
import checkAuth from '../../utils/check'

Page({
    data: {
        logoTitle: getApp().globalData.logoTitle,
        redirect: 'index',
        rediType: 'tab',
    },
    onLoad(options) {
        this.setData({
            redirect: options.redirect || 'index',
            rediType: options.rediType || 'tab',
        })
    },
    onShow() {
        this.setData({
            logoTitle: getApp().globalData.logoTitle || "家政服务平台",
        })
    },
    /* 登录回调事件 */
    onSubmit(e) {
        const form = e.detail.value
        const reg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/
        const valid = (data, cb) => {
            const showError = (msg) => {
                wx.showToast({
                    title: msg,
                    icon: 'error',
                })
                return
            }
            if (!reg.test(Number(data.phone.trim()))) return showError('号码错误')
            if (data.password.length < 6) return showError('密码长度需>=6')
            cb && cb()
        }
        valid(form, () => request({
            url: 'user/login',
            data: {
                ...form,
                username: form.phone
            },
            method: "POST"
        }).then(({
            code,
            msg,
            token
        }) => {
            wx.setStorageSync('token', token)
            this.getUserInfo()
        }))
    },
    // 获取用户信息
    getUserInfo() {
        // 提示统一处理
        const showT = (res) => wx.showToast({
            title: res.msg,
            icon: res.code == 200 ? 'success' : 'error',
        })
        // 路径统一处理
        const pathHandler = (url = this.data.redirect) =>`/pages/${url}/${url}`
        checkAuth(() => {
            request({
                url: 'user/verify'
            }).then(res => {
                wx.setStorageSync('userInfo', res.userInfo)
                if (this.data.redirect == 'index' && this.data.rediType == 'tab') {
                    showT(res)
                    setTimeout(() => {
                        wx.switchTab({
                            url: pathHandler()
                        })
                    }, 2000)
                } else {
                    showT(res)
                    setTimeout(() => {
                        wx.navigateTo({
                            url: pathHandler(),
                        })
                    }, 2000)
                }
            })
        })
    },
    // 前往注册
    linkTo() {
        wx.navigateTo({
            url: '/pages/register/register'
        })
    }
})