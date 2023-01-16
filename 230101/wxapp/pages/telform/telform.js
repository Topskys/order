import request from "../../utils/request";

// pages/telform/telform.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        phone: ''
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {

    },
    // 获取输入的手机号
    formInputChange(e) {
        this.setData({
            phone: e.detail.value
        })
    },
    // 检验手机号

    // 确定按钮的回调
    submitForm() {
        wx.setStorageSync('phone', this.data.phone)
        let reg = /^[1][3,4,5,7,8][0-9]{9}$/
        reg.test(this.data.phone) ? request({
            url: 'users/login',
            method: 'post',
            data: {
                ...wx.getStorageSync('userInfo'),
                phone: this.data.phone || wx.getStorageSync('phone')
            }
        }).then(res => {
            res.code === 200 && wx.setStorageSync('token', res.token)
            request({
                url: 'users/verify',
                method:'post'
            }).then(({
                code,
                userInfo
            }) => {
                code === 200 && wx.setStorageSync('userInfo', userInfo)
                wx.navigateBack({
                    delta: 3,
                })
            })
        }) : wx.showToast({
            title: '手机号有误',
            icon: 'error',
            mask: true,
        })
    },



})