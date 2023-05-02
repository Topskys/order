// pages/login/login.js
const app = getApp()
import request from '../../utils/request'
Page({

    data: {
        logo: app.globalData.logo,
        redirect: 'index',
        rediType: 'tab',
    },
    onLoad(options) {
        console.log(options)
        // 获取重定向路径或重定向类型
        this.setData({
            redirect: options?.redirect,
            rediType: options?.rediType,
        })
    },
    // 数据效验
    valid(data, cb) {
        const showError = (msg) => {
            wx.showToast({
                title: msg,
                icon: 'error',
            })
            return
        }
        if (!data?.username) return showError('请输入正确的账号')
        if (data.password.length < 6) return showError('密码长度需>=6')
        cb && cb()
    },
    // 提交表单
    onSubmit(e) {
        const form = e.detail.value
        this.valid(form, () => request({
            url: 'user/login',
            data: form,
            method: "POST"
        }).then(({
            code,
            token,
            msg
        }) => {
            wx.setStorageSync('token', token)
            code == 200 && this.verify()
        }))
    },
    // 获取个人完整信息
    verify() {
        request({
            url: 'user/verify'
        }).then(res => {
            wx.setStorageSync('userInfo', res.userInfo)
            if (res.code == 200 && this.data.redirect) {
                this.data.rediType == 'tab' ? wx.switchTab({
                    url: '/pages/index/index',
                }) : wx.navigateTo({
                    url: this.data.redirect
                })
            }
        })
    },


})