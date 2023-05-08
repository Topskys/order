// pages/query.js
Page({

    data: {
        userInfo: getApp().globalData.userInfo,
        links: [{
                title: '钱包',
                icon: 'credit-pay',
                url: ''
            },
            {
                title: '收藏',
                icon: 'star-o',
                url: "/pages/collection/collection"
            },
            {
                title: '优惠劵',
                icon: 'coupon-o',
                url: ''
            }
        ],
        menuList: [{
                title: '我的发布',
                url: '#'
            }, {
                title: '联系客服',
                url: '#'
            },
            {
                title: '个人信息',
                url: '/pages/info/info'
            },
            {
                title: '领优惠劵',
                url: '#'
            },
            {
                title: '关注我们',
                url: '/pages/follow/follow'
            },
            {
                title: '服务协议',
                url: '#'
            }
        ],
    },
    onLoad(options) {

    },
    onShow() {
        // strorage获取用户信息
        this.setData({
            userInfo: getApp().globalData.userInfo
        })
    },
    handleLinkClick(e) {
        wx.navigateTo({
            url: e.currentTarget.dataset.item.url
        })
    },
    toLogin() {
        wx.navigateTo({
            url: '/pages/login/login?back=mine'
        })
    },
    // 客户端退出，删除验证信息
    logout() {
        // wx.removeStorageSync('userInfo')
        // wx.removeStorageSync({
        //     key: 'token',
        //     compelet: () => {
        wx.navigateTo({
            url: '/pages/login/login',
            success: (res) => wx.showToast({
                title: '退出成功',
                icon: 'success',
            }),
        })
        //         }
        //     })
    },
    // 联系客服
    contactServer() {
        wx.makePhoneCall({
            phoneNumber: "18995221189",
        })
    }
})