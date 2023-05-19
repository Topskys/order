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
        logoTitle: "家政服务平台",
        location: wx.getStorageSync('location') || "福州",
    }
})