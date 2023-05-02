// pages/query.js
Page({

    data: {
        userInfo: getApp().globalData.userInfo || {
            // avatarUrl:"https://thirdwx.qlogo.cn/mmopen/vi_32/OqbjGV9UibfRJj3d4Dia0MCk9Hx6Pr7NgDlibN8JTiaM9e8TSAx6Rynoyhpusl2RBw4kGlEMxOUEZ449bedX6Eicguw/132",
            // nickName:'Topsky'
        },
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
                title: '联系客服',
                url: '#'
            },
            {
                title: '个人信息',
                url: '/pages/info/info'
            },
            {
                title: '我的评价',
                url: '#'
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

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {

    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {

    },
    onShow() {
        // strorage获取用户信息
    },
    handleLinkClick(e) {
        wx.navigateTo({
            url: e.currentTarget.dataset.item.url
        })
    },
    toLogin(){
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
    }
})