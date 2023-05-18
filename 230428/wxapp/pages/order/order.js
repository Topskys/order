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
        orders: [{
            _id: "6783246g2342342548",
            title: 'MacBook Pro',
            service: "主板PCB维修",
            price: 3898,
            poster: '/images/08.jpg',
            createdAt: "2023年5月9日15:49:31",
            btn1: '删除',
            btn2: '支付'
        }]
    },
    onShow() {
        this.setData({
            active: app.globalData.curr_order_tab
        })
        this.getDataList()
    },
    // 切换tab
    onChange(e) {
        this.setData({
            active: e.detail.index || 0,
            orders: []
        })
         this.getDataList(e.detail.index !== 0 ?e.detail.title:'')

    },
    // 获取订单列表数据
    getDataList(keyword = '') {
        checkAuth(() => {
            request({
                url: 'order',
                data: {
                    keyword
                }
            }).then(({
                data
            }) => {
                this.formatData(data)
            })
        }, 'order', 'tab')
    },
    // 处理服务端响应的订单数据
    formatData(arr = []) {
        arr.forEach(item => {
            item.btn1 = "删除"
            item.btn2 = "去支付"
            if (item.status.includes("待上门")) {
                item.btn1 = ""
                item.btn2 = ""
            }
            if (item.status.includes("服务中")) {
                item.btn1 = ""
                item.btn2 = "完成"
            }
            if (item.status.includes("待评价")) {
                item.btn1 = ""
                item.btn2 = "评价"
            }
        })
        this.setData({
            orders: arr
        })
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
    // 订单按钮事件
    clickOrderCard(e) {
        const {
            item = '',
                btn = ''
        } = e.detail
        const navTo = (URL) => wx.navigateTo({
            url: URL
        })
        switch (btn) {
            case "删除":
                request({
                    url: `order/${item._id}`,
                    method: "delete"
                }).then(({
                    msg
                }) => {
                    wx.showToast({
                        title: msg,
                        icon: 'none',
                        complete: () => this.getDataList()
                    })
                })
                break;
            case "去支付":
                navTo(`/pages/pay/pay?order_id=${item._id}`)
                break;
            case "完成":
                request({
                    url: `order/service/${item._id}`,
                    method: "put",
                    data: {
                        ...item,
                        status: "待评价"
                    }
                }).then(({
                    msg
                }) => {
                    this.setData({
                        active: this.data.active+1,
                        orders: []
                    })
                    wx.showToast({
                        title: msg,
                        icon: 'none',
                        complete: () => this.getDataList()
                    })
                })
                break;
            case "评价":
                navTo(`/pages/comment/comment?product_id=${item.product_id}`)
                break;
            default:
                break;
        }
    },
})