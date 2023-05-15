import request from "../../utils/request"
import checkAuth from "../../utils/check.js"

const app = getApp()
// pages/detail/detail.js
Page({

    data: {
        detail: null,
        evaluattions: [],
        cardActive: 0,
        // 当前选择的服务
        currSelect: {},
        tabActive: 0,
        currrent_product_id: null,
        userInfo: app.globalData.userInfo
    },
    // 选择服务事件
    onSelect(e) {
        this.setData({
            cardActive: e.currentTarget.dataset.index || 0,
            currSelect: {
                ...this.data.currSelect,
                ...e.currentTarget.dataset.item,
            }
        })
    },
    // change tab
    onChange(e) {
        this.setData({
            tabActive: e.detail.index || 0
        })
    },
    onLoad(options) {
        const id = options.product_id
        wx.setStorageSync("current_product_id", id)
    },
    onShow() {
        this.setData({
            currrent_product_id: wx.getStorageSync('current_product_id'),
            userInfo: app.globalData.userInfo
        })
        this.getDetailInfo(this.currrent_product_id || wx.getStorageSync('current_product_id'))
    },
    // 获取详情信息
    getDetailInfo(product_id) {
        request({
            url: `product/${product_id||wx.getStorageSync('current_product_id')}`
        }).then((res) => {
            this.setData({
                detail: res.data || {}
            })
            this.getProEvaluate(res.data._id || wx.getStorageSync('current_product_id'))
            this.setData({
                currSelect: {
                    product_id: res.data._id.toString(),
                    ...res.data.services[0]
                }
            })
        })
    },
    // 获取商品评价信息
    async getProEvaluate(id) {
        this.setData({
            evaluattions: (await request({
                url: `evaluate/${id}`
            })).data || []
        })
    },
    // 联系我们
    onService() {
        checkAuth(() => {
            wx.navigateTo({
                url: `/pages/contact/contact`,
            })
        }, 'contact', 'nav')
    },
    // 加入收藏
    onCollect() {
        checkAuth(() => {
            request({
                url: "favorite",
                method: 'post',
                data: {
                    ...this.data.detail,
                    product_id: this.data.currrent_product_id || this.data.detail._id,
                },
            }).then(res => {
                wx.showToast({
                    title: res.msg,
                    icon: 'none',
                })
            })
        }, 'service', 'nav')
    },
    // 立即预约
    onOrder() {
        checkAuth(() => {
            const currSel = this.data.currSelect
            const u = this.data.userInfo || wx.getStorageSync('userInfo')
            const user = {
                user_id: u._id,
                nickName: u.nickName,
                phone: u.phone,
                address: u.address
            }
            const data = {
                product_id: this.currrent_product_id || this.data.detail._id || wx.getStorageSync('current_product_id'),
                title: this.data.detail.title,
                poster: this.data.detail.poster,
                service: currSel.title,
                origin_price: currSel.price,
                ...user
            }
            request({
                url: 'order',
                method: 'post',
                data
            }).then(res => {
                wx.setStorageSync('current_order_id', res.data._id)
                wx.navigateTo({
                    url: `/pages/ready/ready?order_id=${res.data._id}`,
                })
            })
        }, 'index', 'nav')
    },

})