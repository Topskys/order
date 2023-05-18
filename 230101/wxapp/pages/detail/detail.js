import request from "../../utils/request"
import CheckAuth from "../../utils/auth"

// pages/detail/detail.js
Page({

    data: {
        detail: {},
        current: 0,
        comments: [],
        temp: {},
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        this.getDetailInfo(options._id)
        wx.setNavigationBarTitle({
            title: options.title
        })
    },
    // 获取详情
    getDetailInfo(id) {
        request({
            url: `detail/${id}`
        }).then(res => {
            this.setData({
                detail: res.data
            })
        })
        request({
            url: `comments/${id}`
        }).then(res => {
            this.setData({
                comments: res.data
            })
        })
    },
    // 图片预览
    handlePreviewImage({
        currentTarget
    }) {
        wx.previewImage({
            current: currentTarget.dataset.image, // the URL of image
            urls: this.data.detail.slides,
        })
    },
    // tabbar
    handleChangeTabbar(e) {
        this.setData({
            current: e.currentTarget.dataset.current
        })
    },
    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {

    },
    // 跳转订单的回调
    handleShopCart() {
        wx.switchTab({
            url: '/pages/shopCart/shopCart',
        })
    },
    // 添加购物车的回调
    handleAdd() {
        const u = wx.getStorageSync('userInfo')
        const data = {
            phone: wx.getStorageSync('phone'),
            roomId: this.data.detail.roomId,
            userId: u._id,
            nickName: u.nickName,
            rentTime: wx.getStorageSync('rentTime')
        }
        CheckAuth(async () => {
            const res = await request({
                url: "carts",
                method: 'post',
                data
            })
            wx.showToast({
                title: res.msg,
                icon: 'none'
            })
        })
    },
    // 立即预定的回调
    handlePurchase() {
        const u = wx.getStorageSync('userInfo')
        const data = {
            phone: wx.getStorageSync('phone'),
            roomId: this.data.detail.roomId,
            userId: u._id,
            nickName: u.nickName,
            rentTime: wx.getStorageSync('rentTime'),
            checked:true,
        }
        CheckAuth(async () => {
            const res = await request({
                url: "carts",
                method: 'post',
                data
            })
            wx.showToast({
                title: res.msg,
                icon: 'none'
            })
            res ? wx.navigateTo({
                url: `/pages/pay/pay?ids=${JSON.stringify([res.data._id])}`,
            }) : wx.showToast({
                title: '请稍后重试',
                icon: 'none'
            })
        })
    },
})