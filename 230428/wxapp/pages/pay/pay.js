// pages/pay/pay.js
import checkAuth, {
    getInfo
} from "../../utils/auth"
import request from "../../utils/request"
import Notify from '@vant/weapp/notify/notify';
import {
    computed
} from "./computed"

const app = getApp()
Page({

    data: {
        userInfo: app.globalData.userInfo,
        order: {},
        noticeList: ["价格保障", "质量保障", "纠纷无忧", "意外保险"],
        showPay: false,
    },
    onLoad(options) {
        const id = options.order_id
        wx.setStorageSync('order_id', id)
        this.getOrderInfo(id)
    },
    onShow() {
        this.setData({
            userInfo: wx.getStorageSync('userInfo')
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
                        discount: computed(data.price).disc || 0,
                        disc_id: computed(data.price).disc_id || '',
                        actual_pay: computed(data.price).actual_pay
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
    // 确认支付订单
    onConfirm() {
        const order = this.data.order
        const user = this.data.userInfo || wx.getStorageSync('userInfo')
        checkAuth(() => {
            request({
                url: `order/wx/${this.data.order._id||wx.getStorageSync('pay_order_id')}`,
                method: 'put',
                data: {
                    phone: user.phone,
                    address: user.address,
                    actual_pay: order.actual_pay || 0,
                    discount: order.discount || 0,
                    work_date: order.work_date,
                    remark: order.remark,
                    disc_id: order.disc_id,
                    status: '待上门'
                },
            }).then(res => {
                this.onShowPay()
                Notify({
                    type: 'success',
                    message: res.msg
                });
                wx.navigateTo({
                    url: `/pages/paid/paid?pay_token=${res.pay_token}`,
                })
                getInfo()
            })
        })
    },
    // 打开支付弹窗或关闭
    onShowPay() {
        this.setData({
            showPay: !this.data.showPay || false
        })
    },
})