// pages/mine/mine.js
// import CheckAuth from '../auth/auth';

Page({
    /**
     * 页面的初始数据
     */
    data: {
        userInfo: wx.getStorageSync('userInfo') ,
        // 显示登录注册按钮
        showUser: false, 
        // 充值窗口显隐
        popup:false,
        // 订单
        orders: [{
                title: '待支付',
                icon: 'peer-pay',
                params:0,
            },
            {
                title: '待入住',
                icon: 'underway-o',
                params:1,
            },
            {
                title: '入驻中',
                icon: 'sign',
                params:2,
            },
            {
                title: '待评价',
                icon: 'records',
                params:3,
            }
        ],
        // 服务
        services: [{
                title: '客人信息',
                url: '/pages/info/info',
            },
            {
                title: '领取优惠劵',
                url: '/pages/discount/discount',
            },
            {
                title: '关于',
                url: '/pages/about/about',
            }
        ]
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

    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {
        this.showLoginBtn()
        this.setData({
            userInfo:wx.getStorageSync('userInfo')
        })
    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage() {

    },
    // 检查登录信息
    showLoginBtn() {
        this.setData({
            showUser: (wx.getStorageSync('token') && wx.getStorageSync('userInfo')) ? true : false
        })
    },
    // 登录注册按钮的回调
    navToAuth() {
        wx.navigateTo({
            url: '/pages/auth/auth'
        })
    },
    // 订单项点击回调
    handleOrderClick(e) {
        getApp().globalData.tabActive =e.currentTarget.dataset.item.params || 0
        wx.switchTab({
            url: '/pages/shopCart/shopCart',
        })
    },
    // 退出登录按钮的回调
    logout(){
        wx.removeStorageSync('token')
        wx.removeStorageSync('userInfo')
        wx.removeStorageSync('phone')
        !wx.getStorageSync('token') && (wx.showToast({
          title: '退出成功',
          icon: 'loading',
          mask: true,
        }),this.setData({
            userInfo:{}
        }),this.showLoginBtn())
    },
    showPopup(){
        this.setData({
            popup:!this.data.popup
        })
    }
})