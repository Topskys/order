import CheckAuth from "../../utils/auth"
import request from "../../utils/request"

// pages/comment/comment.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        // 订单id
        orderId: null,
        // 暂存roomId
        roomId: null,
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        this.setData({
            orderId: options.orderId,
            roomId: options.roomId
        })
    },
    // 提交评价按钮的回调
    submitComment(e) {
        CheckAuth(() => {
            request({
                url: 'room/comment/add',
                method: 'post',
                data: {
                    orderId: this.data.orderId,
                    roomId: this.data.roomId,
                    content: e.detail.value.textarea,
                    userId: wx.getStorageSync('userInfo')._id,
                    nickName: wx.getStorageSync('userInfo').nickName
                }
            }).then(({
                code,
                msg
            }) => {
                wx.showToast({
                    title: msg,
                    icon: code === 200 ? 'success' : 'error'
                })
                code === 200 && wx.navigateBack({
                    delta: 1,
                })
            })
        })
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