import checkAuth from "../../utils/check"
import request from "../../utils/request"
import Notify from '@vant/weapp/notify/notify';


import {
    computedPrice
} from "./price.js"

// pages/ready/ready.js
const app = getApp()
Page({

    data: {
        userInfo: wx.getStorageSync('userInfo'),
        order: null,
        currrent_order_id: null,
    },
    onLoad(options) {
        const id = options.order_id
        wx.setStorageSync('currrent_order_id', id)
    },
    onShow() {
        this.setData({
            currrent_order_id: wx.getStorageSync('currrent_order_id')
        })
        this.getOrderInfo(this.data.currrent_order_id)
    },
    // 获取订单信息
    getOrderInfo(orderId) {
        checkAuth(() => {
            request({
                url: `order/${orderId||wx.getStorageSync('current_order_id')}`
            }).then(res => {
                this.setData({
                    order: {
                        ...res.data,
                        actual_price: computedPrice(res.data.origin_price),
                        work_time: new Date().toLocaleDateString()
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
                work_time: e.detail.value || new Date().toLocaleDateString()
            }
        })
    },
    // 预约并支付
    onPay() {
        checkAuth(() => {
            const order=this.data.order
            const userInfo=wx.getStorageSync('userInfo')
            request({
                url: `order/${this.data.order._id||wx.getStorageSync('current_order_id')}`,
                method: 'put',
                data: {
                    address:userInfo.address,
                    user_id:userInfo._id,
                    remark:order.remark,
                    pay_type:order.pay_type,
                    work_time:order.work_time,
                    discount:order.discount+'',
                    origin_price:order.origin_price+'',
                    work_time:order.work_time,
                    actual_price: computedPrice(order.origin_price)+''
                }
            }).then(res => {
                if (res.pay_token) {
                    setTimeout(() => {
                        wx.switchTab({
                            url: '/pages/index/index',
                        })
                    }, 5000)
                    Notify({
                        type: 'success',
                        message: res.msg
                    });
                    wx.showToast({
                        title: res.msg,
                        icon: res.code === 200 ? 'success' : 'error',
                    })
                } else {
                    Notify({
                        type: 'error',
                        message: '请求失败'
                    });
                }
            })
        }, 'order', 'tab')
    },
})