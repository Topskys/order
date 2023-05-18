// app.js
App({
    onLaunch() {
        // 展示本地存储能力
        const logs = wx.getStorageSync('logs') || []
        logs.unshift(Date.now())
        wx.setStorageSync('logs', logs)

        // 登录
        wx.login({
            success: res => {
                // 发送 res.code 到后台换取 openId, sessionKey, unionId
            }
        })
    },
    globalData: {
        logo: '家电维修预约',
        location: wx.getStorageSync('location') || "福州",
        curr_class_tab: 0,
        curr_class_side: 0,
        curr_order_tab: 0,
        userInfo: wx.getStorageSync('userInfo'),
    }
})