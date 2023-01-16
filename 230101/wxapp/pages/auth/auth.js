// pages/auth/auth.js
Page({

    /**
     * 页面的初始数据
     */
    data: {

    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {

    },
    // 授权按钮的回调
    handleAuth() {
        wx.getUserProfile({
            desc: '用于完善会员资料',
            success: res => {
                wx.setStorageSync('userInfo', {
                    ...res.userInfo,
                })
                wx.navigateTo({
                    url: '/pages/telform/telform',
                })
            }
        })
    },
})