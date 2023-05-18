// index.js
// 获取应用实例
const app = getApp()
import request from "../../utils/request"

Page({
    data: {
        // 地理位置
        location: app.globalData.location || '福州',
        locations: [{
            text: "福州",
            value: "福州"
        }, {
            text: "闽侯",
            value: "闽侯"
        }, {
            text: "长乐",
            value: "长乐"
        }, {
            text: "连江",
            value: "连江"
        }, {
            text: "福清",
            value: "福清"
        }, {
            text: "莆田",
            value: "莆田"
        }],
        // 分类数据
        categories: [{
                label: "保姆月嫂",
                poster: "/images/nanny.png"
            },
            {
                label: "中式收纳",
                poster: "/images/manage.png"
            },
            {
                label: "搬家服务",
                poster: "/images/move.png"
            },
            {
                label: "找人做饭",
                poster: "/images/cook.png"
            },
        ],
        recommends: []
    },
    onLoad() {
        this.getDataList()
    },
    // 获取商品列表数据
    getDataList(keyword = app.globalData.location || '福州') {
        request({
            url: 'product',
            data: {
                keyword
            }
        }).then((res) => {
            this.setData({
                recommends: res.data || []
            })
        })
    },
    // 选择服务位置
    onChange(e) {
        app.globalData.location = e.detail
        wx.setStorageSync('location', e.detail)
        this.getDataList(e.detail)
    },
    toQuery(e) {
        wx.setStorageSync('query_tab', e.currentTarget.dataset.index)
        wx.switchTab({
            url: '/pages/query/query'
        })
    },
    //  点击热销推荐列表项跳转详情事件
    toDetail(e) {
        const {
            item
        } = e.currentTarget.dataset
        wx.navigateTo({
            url: `/pages/detail/detail?product_id=${item._id}`
        })
    }
})