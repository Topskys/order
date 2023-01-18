import CheckAuth from "../../utils/auth"
import request from "../../utils/request"
import user from "../../utils/user"

// pages/info/info.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        userInfo: wx.getStorageSync('userInfo')
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {

    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {
        CheckAuth(() => {})
        this.setData({
            userInfo: {
                ...wx.getStorageSync('userInfo'),
                gender: wx.getStorageSync('userInfo').gender === '1' ? '女' : '男'
            }
        })
    },
    // 当前输入的值变化时
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
    },
    // 保存修改按钮的回调
    submit() {
        CheckAuth(() => {
            let reg = /^[1][3,4,5,7,8][0-9]{9}$/
            reg.test(this.data.userInfo.phone) ?
                request({
                    url: 'users',
                    method: 'put',
                    data: {
                        ...this.data.userInfo
                    }
                }).then(({
                    code,
                    msg
                }) => {
                    wx.showToast({
                        title: msg,
                        icon: code === 200 ? 'success' : 'error',
                        success: () => wx.setStorageSync('phone', this.data.userInfo.phone),
                        complete: () => user.verify(),
                    })
                }) : wx.showToast({
                    title: '手机号错误',
                    icon: 'error',
                })
        })
    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage() {

    }
})