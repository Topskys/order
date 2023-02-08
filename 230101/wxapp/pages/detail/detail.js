import request from "../../utils/request"
import CheckAuth from "../../utils/auth"

// pages/detail/detail.js
Page({

    /** 
     * 页面的初始数据
     */
    data: {
        detail: {},
        current: 0,
        comments:[],
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
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {

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
        CheckAuth(() => {
            let phone = wx.getStorageSync('phone')
            let roomId = this.data.detail.roomId
            let userInfo = wx.getStorageSync('userInfo')
            request({
                url: "carts",
                method:'post',
                data: {
                    phone,
                    roomId,
                    userId:userInfo._id,
                    nickName:userInfo.nickName,
                    rentTime:wx.getStorageSync('rentTime') 
                } 
            }).then(res => {
                wx.showToast({
                    title: res.msg || '加入购物车成功',
                })
            })
        })
    },
    // 立即购买的回调
    handlePurchase() {},
})