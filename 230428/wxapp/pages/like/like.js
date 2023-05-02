import checkAuth from "../../utils/auth"
import request from "../../utils/request"

// pages/like/like.js
Page({

    data: {
        leftList: [{
                title: '热水壶独孤皇后的共和国包含的VB并VS大V拨打改并v发VVCVG电视电话不并v打包后',
                price: 39.99,
                poster: '/images/detail-01.jpg',
                sale_num: 18090
            },
            {
                title: '热水壶独孤皇后的共和国包含的VB并VS大V拨打改并v发VVCVG电视电话不并v打包后',
                price: 99.99,
                poster: '/images/01.jpg',
                sale_num: 39090
            },
            {
                title: '热水壶独孤皇后的共和国包含的VB并VS大V拨打改并v发VVCVG电视电话不并v打包后',
                price: 99.99,
                poster: '/images/01.jpg',
                sale_num: 39090
            },
            {
                title: '热水壶独孤皇后的共和国包含的VB并VS大V拨打改并v发VVCVG电视电话不并v打包后',
                price: 99.99,
                poster: '/images/01.jpg',
                sale_num: 39090
            },
        ],
        rightList: [{
                title: '热水壶独孤皇后的共和国包含的VB并VS大V拨打改并v发VVCVG电视电话不并v打包后',
                price: 99.99,
                poster: '/images/01.jpg',
                sale_num: 39090
            },
            {
                title: '热水壶独孤皇后的共和国包含的VB并VS大V拨打改并v发VVCVG电视电话不并v打包后',
                price: 99.99,
                poster: '/images/01.jpg',
                sale_num: 39090
            },
            {
                title: '热水壶独孤皇后的共和国包含的VB并VS大V拨打改并v发VVCVG电视电话不并v打包后',
                price: 39.99,
                poster: '/images/detail-01.jpg',
                sale_num: 18090
            }
        ],
    },
    // 跳转详情
    toDetail(e) {
        const item = e.currentTarget.dataset.item
        wx.navigateTo({
            url: `/pages/detail/detail?_id=${item._id}`,
        })
    },
    // 获取关注列表
    getDataList() {
        checkAuth(() => {
            request({
                url: 'like'
            }).then(res => {
                const arr = res.data || []
                this.setData({
                    leftList: arr.slice(0, arr.length / 2),
                    rightList: arr.slice(arr.length / 2, )
                })
            })
        }, 'like')
    },
    onShow() {
        // this.getDataList()
    }
})