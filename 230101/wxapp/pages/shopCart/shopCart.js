// // pages/shopCart/shopCart.js

import CheckAuth from '../../utils/auth';
import user from '../../utils/user';
import request from '../../utils/request';


Page({

    /**
     * 页面的初始数据
     */
    data: {
        tabActive: 0, // tab选中栏
        slideButtons: [{
            type: "warn",
            text: "删除"
        }],
        page: 1,
        pageSize: 10,
        // 待付款列表
        carts1: [], // 待支付
        carts2: [], // 待入住
        carts3: [], // 入驻中
        carts4: [], // 待评价
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {},
    onShow() {
        this.setData({
            tabActive: getApp().globalData.tabActive || 0,
        })
        this.getOrderList()
    },
    /**
     * 生命周期函数--监听页面
     */
    onHide() {
        getApp().globalData.tabActive = 0
    },
    // 左滑删除
    slideButtonTap(e) {
        var id = e.currentTarget.dataset.id
        this.setData({
            carts1: this.data.carts1.filter(x => x._id != id)
        })
        request({
            url: `carts/${id}`,
            method: "delete"
        }).then(res => {
            wx.showToast({
                title: res.msg,
                icon: res.code == 200 ? 'success' : 'error',
            })
        })
    },
    // 勾选商品
    handleCheck(e) {
        var item = e.currentTarget.dataset.item
        this.setData({
            carts1: this.data.carts1.map(x => ({
                ...x,
                checked: false
            }))
        })
        item.checked = !item.checked
        this.handleUpdateView(item)
    },
    // -
    handleMinus(e) {
        var item = e.currentTarget.dataset.item
        if (item.number === 1) return wx.showToast({
            title: '数量必须为1件以上',
        })
        item.number--
        this.handleUpdateView(item)
    },
    // +
    handleAdd(e) {
        var item = e.currentTarget.dataset.item
        item.number++
        this.handleUpdateView(item)
    },
    // 全选按钮
    handleCheckChange(e) {
        if (e.detail.value.length === 0) {
            this.setData({
                cartList: this.data.carts1.map(x => ({
                    ...x,
                    checked: false
                }))
            })
            // 同步后端
        } else {
            this.setData({
                carts1: this.data.carts1.map(x => ({
                    ...x,
                    checked: true
                }))
            })
            // 同步后端
        }
    },
    // 更细视图
    handleUpdateView(item) {
        this.setData({
            carts1: this.data.carts1.map(x => {
                if (x._id === item._id) {
                    return item
                }
                return x
            })
        })
        request({
            url: `carts`,
            method: "put", // 不支持patch请求，局部更新
            data: {
                ...item,
            }
        })
    },
    // 监听tab栏的回调
    onChange(e) {
        this.setData({
            tabActive: e.detail.index
        })
        e.detail.index === 0 && this.getOrderList()
    },
    // 点击列表项的回调
    clickItem(e) {
        console.log(e)
    },
    // 获取待支付列表
    getOrderList() {
        CheckAuth(() => {
            let phone = wx.getStorageSync('phone')
            request({
                url: `carts?phone=${phone}&page=${this.data.page}&pageSize=${this.data.pageSize}`
            }).then(res => {
                let [arr1, arr2, arr3, arr4] = [
                    [],
                    [],
                    [],
                    []
                ]
                let kv = [{
                        k: '0',
                        f: (x) => arr1.push(x)
                    },
                    {
                        k: '1',
                        f: (x) => arr2.push(x)
                    },
                    {
                        k: '2',
                        f: (x) => arr3.push(x)
                    },
                    {
                        k: '3',
                        f: (x) => arr4.push(x)
                    }
                ]
                res.data.forEach(r => kv.forEach(x => r.status === x.k && x.f(r)))
                this.setData({
                    carts1: arr1,
                    carts2: arr2,
                    carts3: arr3,
                    carts4: arr4,
                })
            })
        })
    },
    // 去结算
    handlePay() {
        CheckAuth(() => {
            let ids = []
            this.data.carts1.forEach(x => x.checked && ids.push(x._id))
            ids.length ? wx.navigateTo({
                url: `/pages/pay/pay?ids=${JSON.stringify(ids)}`
            }) : wx.showToast({
                title: '请选择',
                icon: 'error'
            })
        })
    },
    // 跳转详情
    toDetail(o) {
        wx.navigateTo({
            url: `/pages/detail/detail?_id=${o.detail.roomId}&title=${o.detail.room.title}`
        })
    },
    // 按钮点击事件的回调
    btnEvent(o) {
        CheckAuth(() => {
            o.detail.btn === "评价" ? wx.navigateTo({
                url: `/pages/comment/comment?cart=${ JSON.stringify(o.detail.item)}`
            }) : request({
                url: 'carts',
                method: 'put',
                data: {
                    ...o.detail.item,
                    status: o.detail.btn === "入住" ? '2' : '3'
                }
            }).then(({
                code,
                msg
            }) => {
                code===200 && user.verify()
                wx.showToast({
                    title: msg,
                    icon: code === 200 ? 'success' : 'error',
                    complete: () => this.getOrderList()
                })
            })
        })
    }
})