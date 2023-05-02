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
        // wx.navigateTo({
        //   url: '/pages/login/login',
        // })
    },
    globalData: {
        userInfo: wx.getStorageSync('userInfo') ,
        logoTitle: "景春高级家政",
        location:"福州",
    }
})