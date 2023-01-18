// pages/discount/discount.js
import CheckAuth from '../../utils/auth'
import request from '../../utils/request'
import user from '../../utils/user'
Page({

    /**
     * 页面的初始数据
     */
    data: {
        // 存储优惠劵列表
        list: [],
        // 分页数据
        page:1,
        pageSize:10,
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {

    },
    // 领取优惠劵按钮的回调
    handleTake(e) {
        CheckAuth(() => {
            request({
                url: 'discounts/take',
                method: 'post',
                data: {
                    ...e.currentTarget.dataset.item,
                    userId: wx.getStorageSync('userInfo')._id
                }
            }).then(({
                code,
                msg
            }) => {
                wx.showToast({
                    title: msg,
                    icon: code === 200 ? 'success' : 'error',
                    complete: () => user.verify()
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
        this.getDataList()
    },
    getDataList(){
        // 请求优惠劵列表数据
        request({
            url: 'discounts',
            data:{
                page:this.data.page|| 1,
                pageSize:this.data.pageSize|| 10,
            }
        }).then(({
            code,
            data
        }) => code === 200 && this.setData({
            list: [...this.data.list,...data]
        }))
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
        this.setData({
            list:[]
        })
        this.getDataList()
    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom() {
        this.setData({
            page:++this.data.page
        })
        this.getDataList()
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage() {

    }
})