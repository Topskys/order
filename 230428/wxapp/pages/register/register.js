// pages/register/register.js
const app = getApp()
import request from '../../utils/request'

Page({
    data: {
        logo: app.globalData.logo,
        redirect: null,
        rediType: null,
        temp: '',
    },
    onInput(e) {
        this.setData({
            temp: e.detail.value
        })
    },
    // 获取验证码
    onCode() {
        request({
            url: 'user/code',
            method: 'post',
            data: {
                username: this.data.temp
            }
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
        if (!data?.username) return showError('请输入账号')
        if (!data?.code) return showError('请输入验证码')
        if (data.password.length < 6) return showError('密码长度需>=6')
        cb && cb()
    },
    // 注册
    register(data) {
        this.valid(data, () => request({
            url: 'user/register',
            method: "POST",
            data
        }).then(({
            code,
            msg
        }) => {
            setTimeout(() => {
                wx.navigateTo({
                    url: `/pages/login/login?redirect=${this.data.redirect}&rediType=${this.data.rediType||'tab'}`,
                })
            }, 3000)
            wx.showToast({
                title: msg,
                icon: code == 200 ? 'success' : 'error',
            })
        }))
    },
    // 提交表单
    onSubmit(e) {
        const form = e.detail.value
        wx.getUserProfile({
            desc: 'login',
            lang: 'zh_CN',
            success: (result) => {
                this.register({
                    ...form,
                    ...result.userInfo
                })
            },
            fail: (res) => {},
        })
    },

})