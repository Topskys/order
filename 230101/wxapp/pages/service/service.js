// pages/service/service.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        // 入住基本服务
        baseService: [{
                title: 'wifi',
                icon: 'info-o',
                url: 'wifi'
            },
            {
                title: '清洁',
                icon: 'delete-o',
                url: 'clear'
            },
            {
                title: '客服',
                icon: 'service-o',
                url: 'service'
            },
            {
                title: '退房',
                icon: 'close',
                url: '/pages/shopCart/shopCart'
            }
        ],
        // 显示弹窗
        showDialog: false,
        // 需要清洁房间号
        roomNumber:wx.getStorageSync('roomNumber')||'',
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {

    },
    confirm(e) {
        console.log(e);
    },
    onClose() {
        this.setData({
            showDialog: false
        });
    },
    // 基本服务点击回调
    handleService(e) {
        let x = e.currentTarget.dataset.item
        switch (x.url) {
            case 'wifi':
                this.setData({
                    showDialog: true
                })
                break
            case 'clear':
                this.setData({
                    showDialog: true
                })
                break
            case 'service':
                wx.makePhoneCall({
                    phoneNumber: "15985233142",
                })
                break
            case "/pages/shopCart/shopCart":
                // 退房跳转订单的入住中
                // 把参数保存至全局变量
                getApp().globalData.tabActive = 2
                wx.switchTab({
                    url: x.url,
                })
                break
        }
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

    }
})