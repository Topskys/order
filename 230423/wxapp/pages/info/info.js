import checkAuth from "../../utils/check"
import request from "../../utils/request"

// pages/info/info.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        userInfo: wx.getStorageSync('userInfo')
    },
    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {
        checkAuth(() => {})
        let {
            gender
        } = wx.getStorageSync('userInfo')
        this.setData({
            userInfo: {
                ...wx.getStorageSync('userInfo'),
                gender: ['0', '1'].includes(gender) ? gender === '1' ? '女' : '男' : gender,
            }
        })
    },
    // 输入框值发生变化时
    onChange(e) {
        let which = e.currentTarget.dataset.which
        const fun = (options) => this.setData({
            userInfo: {
                ...this.data.userInfo,
                ...options
            }
        })
        which === 'phone' && fun({
            phone: e.detail.trim()
        })
        which === 'gender' && fun({
            gender: e.detail.trim()
        })
        which === 'email' && fun({
            email: e.detail.trim()
        })
        which === 'address' && fun({
            address: e.detail.trim()
        })
    },
    // 提交修改按钮的回调
    submit() {
        checkAuth(() => {
            const u = this.data.userInfo
            let reg = /^[1][3,4,5,7,8][0-9]{9}$/
            reg.test(u.phone) ?
                request({
                    url: `user/${u._id}`,
                    method: 'put',
                    data: {
                        ...u,
                    }
                }).then(res => {
                    this.verify() // 重新获取用户信息
                    wx.setStorageSync('phone', u.phone)
                    wx.showToast({
                        title: res.msg,
                        icon: res.code === 200 ? 'success' : 'error',
                    })
                }) : wx.showToast({
                    title: '手机号码有误',
                    icon: 'error',
                })
        })
    },
    verify() {
        checkAuth(async () => {
            const res = await request({
                url: 'user/verify'
            })
            wx.setStorageSync('userInfo', res.userInfo)
        })
    }
})