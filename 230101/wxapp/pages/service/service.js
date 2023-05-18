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
                phone: wx.getStorageSync("phone"),
                userId: wx.getStorageSync('userInfo')._id,
                room_number: wx.getStorageSync('userInfo').room_number,
                nickName: wx.getStorageSync('userInfo').nickName,
                order: this.data.order,
            }
        }).then(res => {
            this.onClose()
            wx.showToast({
                title: res.msg || '请稍后',
                icon: res.code === 200 ? 'success' : 'error',
            })
        }).catch((res)=>{
            wx.showToast({
                title: res,
                icon: 'error',
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
                if (this.data.userInfo.room_number) {
                    // 把参数保存至全局变量
                    getApp().globalData.tabActive = 2
                    wx.switchTab({
                        url: x.url,
                    })
                } else {
                    wx.showToast({
                        title: '请先办理入住',
                        icon: 'error',
                    })
                }
                break
        }
    },
    // wifi 
    showPopup() {
        this.setData({
            popup: !this.data.popup
        });
    },
})