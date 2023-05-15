import checkAuth from "../../utils/auth"
import request from "../../utils/request"

// pages/like/like.js
Page({

    data: {
        leftList: [],
        rightList: [],
    },
    onShow() {
        this.getDataList()
    },
    // 跳转详情
    toDetail(e) {
        const item = e.currentTarget.dataset.item
        wx.navigateTo({
            url: `/pages/detail/detail?product_id=${item._id}`,
        })
    },
    // 获取关注列表
    getDataList() {
        checkAuth(() => {
            request({
                url: 'like'
            }).then(res => {
                const [arr,arr0,arr1]=[res.data||[],[],[]]
                arr.map((item, i) => (i > 0 && i % 2) ? arr1.push(item) : arr0.push(item))
                this.setData({
                    leftList: arr0,
                    rightList: arr1
                })
            })
        }, 'like', 'nav')
    },

})