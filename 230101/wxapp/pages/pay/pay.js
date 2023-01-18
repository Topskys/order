import CheckAuth from "../../utils/auth"
import request from "../../utils/request"

// pages/pay/pay.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        // 订单信息
        order: null,
        // 支付方式
        columns: ['微信支付', '余额支付'],
        index: 0,
        // 用户信息
        userInfo: wx.getStorageSync('userInfo'),
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        JSON.parse(options.ids || '{}').forEach(id => this.getOrderInfo(id))
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
                    rent: `${startDate}至${endDate}`
                }
            })
        })
    },
    // 计算价格
    sum(array, discounts = []) {
        var total = 0
        for (var i = 0; i < array.length; i++) {
            if (array[i].checked) {
                total += array[i].room.price * array[i].number
            }
        }
        return Number((discounts.length ? (total - Math.max(...discounts)) : total).toFixed(2))
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
                payType: e.detail.value === '1' ? '余额支付' : '微信支付'
            }
        });
        console.log(_this.data.order)
    },
    // 立即预订按钮的回调
    handleOrder() {
        CheckAuth(() => {
            request({
                url: `carts/pay`,
                method: 'post',
                data: {
                    ...this.data.order,
                    rent: null
                }
            }).then(({
                code,
                data,
                msg
            }) => {
                wx.showToast({
                    title: msg || '支付失败',
                    icon: code === 200 ? 'success' : 'error',
                    complete: () => {
                        code === 200 && (this.setData({
                            order: null,
                        }), wx.setStorageSync('roomNumber', data.roomNumber))
                        wx.navigateTo({
                          url: `/pages/paid/paid?payRes=${JSON.stringify(data)}`
                        })
                    }
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