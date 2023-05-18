// pages/query.js
const app = getApp()
Page({

    data: {
        userInfo: app.globalData.userInfo,
        links: [{
                title: '收藏',
                icon: 'star-o',
                url: "/pages/collection/collection"
            },
            {
                title: '优惠劵',
                icon: 'coupon-o',
                url: '/pages/activity/activity'
            }
        ],
        menuList: [{
                title: '联系我们',
                url: '/pages/contact/contact'
            },
            {
                title: '修改信息',
                url: '/pages/info/info'
            },
            {
                title: '我的收藏',
                url: "/pages/collection/collection"
            },
            {
                title: '领优惠劵',
                url: '/pages/activity/activity'
            },
            {
                title: '关注我们',
                url: '/pages/follow/follow'
            },
        ],
    },
    onLoad(options) {

    },
    onShow() {
        // strorage获取用户信息
        this.setData({
            userInfo: wx.getStorageSync('userInfo') || app.globalData.userInfo
        })
    },
    handleLinkClick(e) {
        wx.navigateTo({
            url: e.currentTarget.dataset.item.url
        })
    },
    toLogin() {
        wx.navigateTo({
            url: '/pages/login/login?redirect=mine&rediType=nav'
        })
    },
    // 客户端退出，删除验证信息
    logout() {
        wx.removeStorageSync('token')
        wx.removeStorageSync('userInfo')
        wx.navigateTo({
            url: '/pages/login/login',
            success: (res) => wx.showToast({
                title: '退出成功',
                icon: 'none',
            }),
        })
    },
    // 联系客服
    contactServer() {
        wx.makePhoneCall({
            phoneNumber: "18995221189",
        })
    }
})