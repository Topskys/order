// pages/mine/mine.js
const app = getApp().globalData
Page({
    data: {
        userInfo: app.userInfo,
        orderMenus: [{
                icon: '/images/mine-01.png',
                label: '待付款'
            },
            {
                icon: '/images/mine-02.png',
                label: '待上门'
            },
            {
                icon: '/images/mine-03.png',
                label: '服务中'
            },
            {
                icon: '/images/mine-04.png',
                label: '待评价'
            }
        ],
        services: [{
                icon: '/images/mine-08.png',
                label: '联系客服',
                url: '/pages/service/service'
            },
            {
                icon: '/images/mine-07.png',
                label: '资料管理',
                url: '/pages/info/info'
            },
            {
                icon: '/images/mine-09.png',
                label: '意见反馈',
                url: '#'
            },
            {
                icon: '/images/mine-05.png',
                label: '福利中心',
                url: '/pages/class/class'
            },
            {
                icon: '/images/mine-10.png',
                label: '关于我们',
                url: '/pages/about/about'
            },
            {
                icon: '/images/mine-11.png',
                label: '帮助中心',
                url: '#'
            },
        ]
    },
    onLoad(options) {

    },
    onShow() {

    },
    // 跳转订单页
    toOrder(e) {
        app.curr_order_tab = e.currentTarget.dataset.index + 1 || 0
        wx.switchTab({
            url: "/pages/order/order",
        })
    },
    toClass(e) {
        app.curr_class_tab = 1
        wx.switchTab({
            url: e.currentTarget.dataset.url || "/pages/class/class",
        })
    }
})