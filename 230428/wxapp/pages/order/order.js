import checkAuth from "../../utils/auth"
import request from "../../utils/request"
const app = getApp()
// pages/order/order.js
Page({
    data: {
        active: app.globalData.curr_order_tab || 0,
        poster: 'https://img01.yzcdn.cn/vant/ipad.jpeg',
        arr0: [],
        arr1: [],
        arr2: [],
        arr3: [],
        arr4: [],
    },
    onShow() {
        this.setData({
            active: app.globalData.curr_order_tab
        })
        // this.getDataList()
    },
    // 切换tab
    onChange(e) {
        this.setData({
            active: e.detail.index || 0
        })
    },
    // 获取订单列表数据
    getDataList() {
        checkAuth(() => {
            request({
                url: 'order'
            }).then(({
                code,
                msg,
                data
            }) => {
                const arr = data
                arr.forEach(item => {

                })
                this.setData({
                    arr0: data || [],
                })
            })
        }, 'order')
    },
    // 取消订单
    onCancel(e) {
        const item = e.currentTarget.dataset.item
        checkAuth(() => {
            request({
                url: `order/${item._id}`,
                method: 'put',
            }).then(({
                data,
                code,
                msg
            }) => {
                wx.showToast({
                    title: msg,
                    icon: 'none',
                })
            })
        }, 'order')
    },
    // 跳转支付
    toPay(e) {
        const item = e.currentTarget.dataset.item
        checkAuth(() => {
            wx.navigateTo({
                url: `/pages/pay/pay?productId=${item._id}`
            })
        })
    },
})