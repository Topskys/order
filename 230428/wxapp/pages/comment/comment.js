import checkAuth from "../../utils/auth"
import request from "../../utils/request"

// pages/comment/comment.js
Page({
    data: {
        star: 0,
        stars: 5,
        product_id: null,
    },
    // 监听评星状态
    onStar(e) {
        this.setData({
            star: e.currentTarget.dataset.index || 0
        })
    },
    // 发布评价
    onSubmit(e) {
        const form = e.detail.value
        checkAuth(() => {
            request({
                url: `comment/${this.data.product_id}`,
                method: 'post',
                data: {
                    star: this.data.star || 0,
                    ...form
                }
            }).then(({
                code,
                msg
            }) => {
                wx.showToast({
                    title: msg,
                    icon: code == 200 ? 'success' : 'error',
                })
                setTimeout(()=>{
                    wx.switchTab({
                      url: '/pages/index/index',
                    })
                },2000)
            })
        }, 'index')
    },
    onLoad(options) {
        this.setData({
            product_id:options.product_id
        })
    }
})