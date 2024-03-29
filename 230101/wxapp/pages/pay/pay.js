import CheckAuth from "../../utils/auth"
import user from "../../utils/user"
import request from "../../utils/request"

// pages/pay/pay.js
Page({

    data: {
        // 订单信息
        order: null,
        // 支付方式
        columns: ['微信支付', '余额支付'],
        index: 0,
        // 用户信息
        userInfo: wx.getStorageSync('userInfo'),
    },
    onLoad(options) {
        JSON.parse(options.ids).forEach(id => this.getOrderInfo(id))
    },
    // 获取订单信息
    getOrderInfo(id) {
        let {
            startDate,
            endDate,
            time
        } = wx.getStorageSync('rentTime')
        request({
            url: `carts/${id}` // /:id
        }).then(res => {
            startDate = startDate || res.data.rentTime.startDate
            endDate = endDate || res.data.rentTime.endDate
            this.setData({
                order: {
                    ...res.data,
                    total: this.sum([res.data], this.data.userInfo.discounts),
                    rent: `${startDate}至${endDate}`,
                    discount:Math.max(...this.data.userInfo.discounts)
                }
            })
        })
    },
    // 计算价格
    sum(arr, dis = []) {
        var total = 0
        for (var i = 0; i < arr.length; i++) {
            if (arr[i].checked) {
                total += arr[i].room.price * arr[i].number
            }
        }
        return Number((dis.length > 0 ? (total - Math.max(...dis)) : total).toFixed(2))
    },
    // 点击复选框的回调
    onCheckChange(e) {
        let _this = this
        this.setData({
            order: {
                ..._this.data.order,
                checked: e.detail
            }
        });
    },
    // 支付方式的回调
    onPickerChange(e) {
        let _this = this
        this.setData({
            order: {
                ..._this.data.order,
                payType: e.detail.value === "1" ? '余额支付' : '微信支付'
            }
        });
    },
    // 立即预订按钮的回调
    handleOrder() {
        CheckAuth(() => {
            request({
                url: `carts/pay`,
                method: 'post',
                data: {
                    ...this.data.order,
                    discount: this.data.userInfo.discounts.length > 0 ? Math.max(...this.data.userInfo.discounts) : 0,
                    rent: null
                }
            }).then(({
                code,
                data,
                msg
            }) => {
                if (code === 200) {
                    this.setData({
                        order: null,
                    });
                    wx.setStorageSync('roomNumber', data.roomNumber)
                    wx.navigateTo({
                        url: `/pages/paid/paid?payRes=${JSON.stringify(data)}`
                    })
                    user.verify()
                }
                wx.showToast({
                    title: msg || '支付失败',
                    icon: code === 200 ? 'success' : 'error',
                })
            })
        })
    },


    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage() {

    }
})