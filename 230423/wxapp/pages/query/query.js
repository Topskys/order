// pages/query.js
import request from '../../utils/request'
Page({

    data: {
        categories: [],
        active: 0,
        products: [],
    },
    onShow() {
        this.getCateList()
        // this.getDataList()
    },
    // 获取分类数据
    getCateList() {
        request({
            url: 'category'
        }).then((res) => {
            this.setData({
                categories: res.data || []
            })
        })
    },
    // 获取商品列表数据
    getDataList(keyword = '') {
        request({
            url: 'product',
            data: {
                keyword
            }
        }).then((res) => {
            this.setData({
                products: res.data || []
            })
        })
    },
    // 点击tabs回调事件
    onChange(e) {
        this.getDataList(e.detail.title)
    },
    // 点击商品跳转详情
    onProductItem(e) {
        const item = e.currentTarget.dataset.item || {}
        wx.navigateTo({
            url: `/pages/detail/detail?product_id=${item._id}`,
        })
    },
})