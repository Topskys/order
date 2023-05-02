import checkAuth from "../../utils/check"
import request from "../../utils/request"

// pages/ready/ready.js
const app = getApp()
Page({

    data: {
        userInfo: app.globalData.userInfo,
        order: {
            title: '深度保洁4小时',
            work_date: '2023-05-01',
            discount: '10',
            pay_type: '微信支付',
            remark: '',
            origin_price: 299,
            actual_price: 599.99,
        }
    },
    onLoad(options) {
        const id = options.orderId || wx.getStorageSync('current_orderId')
        this.getOrderInfo(id)
    },
    onShow() {

    },
    // 获取订单信息
    getOrderInfo(orderId) {
        checkAuth(() => {
            request({
                url: `order/${orderId||wx.getStorageSync('current_orderId')}`
            }).then(res => {
                this.setData({
                    detail: {
                        ...this.data.detail,
                        ...res.data
                    }
                })
            })
        }, 'order', 'tab')
    },
    // 备注输入框输入事件
    onInput(e) {
        this.setData({
            order: {
                ...this.data.order,
                remark: e.detail.value.trim()
            }
        })
    },
    // 时间选择器
    bindDateChange(e) {
        this.setData({
            order: {
                ...this.data.order,
                work_date: e.detail.value || new Date().toLocaleDateString()
            }
        })
    },
    // 预约并支付
    onPay() {
        checkAuth(() => {
            request({
                url: `order/${this.data.order._id||wx.getStorageSync('current_orderId')}`,
                method: 'put',
                data: {
                    ...this.data.order
                }
            }).then(res => {
                setTimeout(() => {
                    wx.switchTab({
                        url: '/pages/index/index',
                    })
                }, 5000)
                wx.showToast({
                    title: res.msg,
                    icon: res.code === 200 ? 'success' : 'error',
                })
            })
        }, 'order', 'tab')
    },
})