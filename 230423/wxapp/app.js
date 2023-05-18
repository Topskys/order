// app.js
App({
    onLaunch() {
        // 展示本地存储能力
        const logs = wx.getStorageSync('logs') || []
        logs.unshift(Date.now())
        wx.setStorageSync('logs', logs)
    },
    globalData: {
        userInfo: wx.getStorageSync('userInfo'),
        logoTitle: "景春高级家政",
        location: wx.getStorageSync('location') || "福州",
    }
})