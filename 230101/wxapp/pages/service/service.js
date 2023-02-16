import request from "../../utils/request";

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
        // 用户信息
        userInfo: wx.getStorageSync('userInfo'),
        // 预约清洁时间
        order: '中午',
        // wifi popup
        popup: false,
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {

    },
    // 清洁窗台确认按钮的回调
    confirm(e) {
        request({
            url: 'service',
            method: 'post',
            data: {
                ...this.data.userInfo,
                order: this.data.order,
            }
        }).then(res => {
            res.code === 200 && this.onClose()
            wx.showToast({
                title: res.msg || '请稍后',
                icon: res.code === 200 ? 'success' : 'error',
            })
        })
    },
    // 关闭Dialog
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
                this.showPopup()
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
                this.data.userInfo.room_number ? wx.switchTab({
                    url: x.url,
                    success: () => {
                        // 把参数保存至全局变量
                        getApp().globalData.tabActive = 2
                    }
                }) : wx.showToast({
                    title: '请先办理入住',
                    icon: 'error',
                })
                break
        }
    },
    // wifi 
    showPopup() {
        this.setData({
            popup: !this.data.popup
        });
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {},

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