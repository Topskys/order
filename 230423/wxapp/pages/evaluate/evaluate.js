// pages/evaluate/evaluate.js

import checkAuth from '../../utils/check'
import request from '../../utils/request'
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
        checkAuth(async () => {
                const res=await request({
                    url: `evaluate/${id}`,
                    method: 'post',
                    data: {
                        ...e.detail.value
                    }
                })
                // await request({
                //     url: `order/wx/${id}`,
                //     method: 'put',
                //     data: {
                //         status: '完成'
                //     }
                // })
                wx.showToast({
                    title: "发布成功",
                    icon: code == 200 ? 'success' : 'error',
                })
                setTimeout(()=>{wx.switchTab({
                    url: '/pages/index/index',
                  })},0)
            },
            'index')
    },

})