import request from "../../utils/request";
import user from "../../utils/user";

// pages/telform/telform.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        phone: ''
    },
    // 获取输入的手机号
    formInputChange(e) {
        this.setData({
            phone: e.detail.value
        })
    },
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
            res.code === 200 && (wx.setStorageSync('token', res.token), user.verify(), wx.switchTab({
              url: '/pages/home/home',
            }))
            // wx.navigateBack({
            //     delta: 3, // 回退第二个页面
            // })
        }) : wx.showToast({
            title: '手机号有误',
            icon: 'error',
            mask: true,
        })
    },



})