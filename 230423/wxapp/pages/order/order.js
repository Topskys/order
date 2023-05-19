import checkAuth from "../../utils/check";
import request from "../../utils/request";

Page({

    data: {
        active: 0,
        orders: [], // 全部
        arr0: [], // 待付款
        arr1: [], // 进行中
        arr2: [], // 评价
        slideButtons: [{
            type: "warn",
            text: "删除"
        }],
    },
    onChange(event) {
        // console.log(event.detail)
    },
    onLoad(options) {

    },
    onShow() {
        this.getOrderList()
    },
    // 获取预定订单列表
    getOrderList() {
        checkAuth(() => {
            request({
                url: 'order'
            }).then(res => {
                const arr = res.data || []
                const [orders, arr0, arr1, arr2] = [
                    [],
                    [],
                    [],
                    []
                ] // 定义空数组
                // 数据格式化，整理数据
                arr.forEach(item => orders.push({
                    ...item,
                    btn1: "取消",
                    btn2: "支付"
                }))
                orders.forEach(item => {
                    item.status.includes("待支付") && arr0.push(item)
                    if (item.status.includes("进行中")) {
                        item.btn2 = ""
                        arr1.push({
                            ...item,
                            btn1: "",
                            btn2: "完成"
                        })
                    }
                    if (item.status.includes("待评价")) {
                        item.btn2 = "评价"
                        arr2.push({
                            ...item,
                            btn1: "",
                            btn2: "评价"
                        })
                    }
                    if (item.status.includes("完成")) {
                        item.btn1 = ""
                        item.btn2 = ""
                    }
                })
                this.setData({
                    orders: orders || [],
                    arr0: arr0 || [],
                    arr1: arr1 || [],
                    arr2: arr2 || [],
                })
            })
        }, 'order', 'tab')
    },
    // 处理订单按钮事件
    clickHandler(e) {
        const {
            item = '', btn = ''
        } = e.detail
        const navTo = (URL) => wx.navigateTo({
            url: URL
        })
        switch (btn) {
            case "取消":
                request({
                    url: `order/${item._id}`,
                    method: "delete"
                }).then(res => {
                    this.getOrderList()
                    wx.showToast({
                        title: res.msg,
                        icon: 'none',
                    })
                })
                break;
            case "支付":
                navTo(`/pages/ready/ready?order_id=${item._id}`)
                break;
            case "完成":
                request({
                    url: `order/wx/${item._id}`,
                    method: "put",
                    data: {
                        ...item,
                        status: '待评价'
                    }
                }).then(res => {
                    this.getOrderList()
                    wx.showToast({
                        title: res.msg,
                        icon: 'none',
                    })
                })
                break;
            case "评价":
                navTo(`/pages/evaluate/evaluate?product_id=${item.product_id}`)
                break;
            default:
                break;
        }
    },
    // 左滑删除
    slideButtonTap(e) {
        var id = e.currentTarget.dataset.id
        wx.showModal({
            cancelText: '取消',
            confirmText: '删除',
            content: '您确定删除订单',
            showCancel: true,
            title: '删除订单',
            success: (result) => {
                request({
                    url: `order/${id}`,
                    method: "delete"
                }).then(res => {
                    this.setData({
                        orders: this.data.orders.filter(x => x._id != id)
                    })
                    wx.showToast({
                        title: res.msg,
                        icon: res.code == 200 ? 'success' : 'error',
                    })
                })
            },
        })
    },
    // 跳转支付
    toPay(e) {
        const {
            item
        } = e.currentTarget.dataset
        if (item.btn == '支付' || item.btn2 == '支付') {
            wx.navigateTo({
                url: `/pages/ready/ready?order_id=${item._id}`,
            })
        }
        if (item.btn2 == '评价') {
            wx.navigateTo({
                url: `/pages/evaluate/evaluate?product_id=${item.product_id}`,
            })
        }
    }
})