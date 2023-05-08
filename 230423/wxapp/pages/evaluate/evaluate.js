// pages/evaluate/evaluate.js
Page({

    data: {
        product_id: null,
    },
    onLoad(options) {
        wx.setStorageSync('current_product_id', options.product_id)
    },
    onShow() {
        this.setData({
            product_id: wx.getStorageSync('current_product_id')
        })
    },
    // 发布评价
    pushEvaluation(e) {
        let id = this.data.product_id || wx.getStorageSync('current_product_id')
        checkAuth(() => {
            request({
                url: `evaluate/${id}`,
                method: 'post',
                data: {
                    ...e.detail.value
                }
            }).then(({
                code,
                msg
            }) => {
                wx.showToast({
                    title: msg,
                    icon: code == 200 ? 'success' : 'error',
                })
            })
        }, 'index')
    },

})