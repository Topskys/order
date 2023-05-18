// pages/paid/paid.js
Page({
    data: {
        result: "支付成功",
    },
    onLoad(options) {
        this.setData({
            result: options.pay_token ? "支付成功" : "支付失败"
        })
    },
    // 返回首页
    onBack() {
        wx.switchTab({
            url: '/pages/index/index',
        })
    }
})