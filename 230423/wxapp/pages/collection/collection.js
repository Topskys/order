// pages/collection/collection.js
import checkAuth from '../../utils/check'
import request from '../../utils/request'

Page({
    data: {
        query: {
            page: 1,
            pageSize: 10,
        },
        collections: [],
    },
    onShow() {
        this.getDataList()
    },
    // 获取列表数据
    getDataList() {
        checkAuth(() => {
            request({
                url: 'favorite',
                data: this.data.query,
            }).then(({
                code,
                data,
                msg
            }) => {
                code == 200 && this.setData({
                    collections: data || []
                })
            })
        }, 'collection', 'nav')
    },
    //  跳转详情事件
    toDetail(e) {
        const {
            item
        } = e.currentTarget.dataset
        wx.navigateTo({
            url: `/pages/detail/detail?product_id=${item._id}`
        })
    }
})