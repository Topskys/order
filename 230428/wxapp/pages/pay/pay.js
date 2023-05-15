// pages/pay/pay.js
import checkAuth from "../../utils/auth"
import request from "../../utils/request"
import Notify from '@vant/weapp/notify/notify';
import {computed} from "./computed"

const app = getApp()
Page({

    data: {
        userInfo: app.globalData.userInfo,
        order: {},
        noticeList: ["价格保障", "质量保障", "纠纷无忧", "意外保险"]
    },
    onLoad(options) {
        const id = options.order_id
        wx.setStorageSync('order_id', id)
        this.getOrderInfo(id)
    },
    onShow() {
        this.setData({
            userInfo: app.globalData.userInfo
        })
    },
    // 获取订单数据
    getOrderInfo(id) {
        checkAuth(() => {
            request({
                url: `order/${id||wx.getStorageSync('order_id')}`
            }).then(({
                data
            }) => {
                this.setData({
                    order: {
                        ...data,
                        actual_pay:computed(data.price)
                    }
                })
            })
        })
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
    // 提交订单
    onSubmit() {
        checkAuth(() => {
            wx.showModal({
                title: '确认支付',
                content: `${this.data.order.actual_pay}`,
                confirmColor: "#0066cc",
                cancelColor: "#b2b2b2",
                success(res) {
                    res.confirm && this.payOrder()
                    // res.cancel
                }
            })
        }, 'index')
    },
    payOrder() {
        request({
            url: `order/${this.data.order._id||wx.getStorageSync('pay_order_id')}`,
            method: 'put',
            data: {
                ...this.data.order
            }
        }).then(({
            code,
            msg,
            data
        }) => {
            Notify({
                type: code == 200 ? 'success' : 'error',
                message: msg || "支付成功"
            });
            code == 200 && setTimeout(() => {
                wx.navigateTo({
                    url: '/pages/',
                })
            }, 3000)
        })
    }
})