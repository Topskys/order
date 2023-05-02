// pages/pay/pay.js

import checkAuth from "../../utils/auth"
import request from "../../utils/request"
import Notify from '@vant/weapp/notify/notify';
const app = getApp()
Page({

    data: {
        userInfo: app.globalData.userInfo,
        order: {
            _id: '888888888888888',
            poster: '/images/01.jpg',
            title: "挂号费改但不能许昌 不像你成VB小VB小程序不基尔霍夫是好红烧",
            price: 89.99,
            actual_pay: 89.99,
            discount: '-9',
            payType: "微信",
            remark: "remark",
            work_date: new Date().toLocaleDateString(),
        },
        noticeList:["价格保障","质量保障","纠纷无忧","意外保险"]
    },
    onLoad(options) {
        const productId = options.productId || wx.getStorageSync('detail_product_id')
        productId && this.getOrderInfo(productId)
    },
    onShow() {

    },
    // 获取订单数据
    getOrderInfo(productId) {
        checkAuth(() => {
            request({
                url: `order/${productId||wx.getStorageSync('detail_product_id')}`
            }).then(({
                data
            }) => {
                wx.setStorageSync('pay_order_id', data._id)
                const getMax = (arr = []) => {
                    return arr.sort(function (a, b) {
                        return a - b
                    })[arr.length - 1]
                }
                const arr = wx.getStorageSync('userInfo').discount
                typeof data.price != 'number' && (data.price = Number(data.price))
                data.price = arr.length && Number((data.price - getMax(arr)).toFixed(2))
                this.setData({
                    order: data || {}
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