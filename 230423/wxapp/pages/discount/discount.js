import checkAuth from "../../utils/check"
import request from "../../utils/request"

// pages/discount/discount.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        disList: [{
            title: '新人专享红包',
            discount_size: 2,
        },{
            title: '新人专享红包',
            discount_size: 6,
        },{
            title: '新人专享红包',
            discount_size: 5,
        },{
            title: '新人专享红包',
            discount_size: 8,
        },{
            title: '新人专享红包',
            discount_size: 9,
        },{
            title: '新人专享红包',
            discount_size: 16,
        },{
            title: '新人专享红包',
            discount_size: 10,
        },{
            title: '新人专享红包',
            discount_size: 0.5,
        },{
            title: '新人专享红包',
            discount_size: 12,
        },{
            title: '新人专享红包',
            discount_size: 6,
        },{
            title: '新人专享红包',
            discount_size: 3,
        }]
    },
    onShow() {

    },
    // 获取优惠劵列表
    async getDiscList() {
        const res = await request({
            url: 'discount'
        })
        this.setData({
            disList: res.data || []
        })
    },
    // 领取优惠劵
    getDisc(e) {
        const item = e.currentTarget.dataset.item
        checkAuth(async () => {
            const res = await request({
                url: `discount/${item._id}`,
                method:'post',
                data:{
                    ...item
                }
            })
            wx.showToast({
                title: res.msg,
                icon: res.code == 200 ? 'success' : 'error',
            })
        }, 'discount', 'nav')
    }
})