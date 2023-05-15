import checkAuth from "../../utils/check"
import request from "../../utils/request"

Page({
    data: {
        disList: []
    },
    onShow() {
        this.getDiscList()
    },
    // 获取优惠劵列表
    async getDiscList() {
        this.setData({
            disList: (await request({
                url: 'activity/wx'
            })).data || []
        })
    },
    // 用户领取优惠劵
    getDisc(e) {
        const item = e.currentTarget.dataset.item
        checkAuth(async () => {
            wx.showToast({
                title: (await request({
                    url: `activity/${item._id}`
                })).msg,
                icon: 'none',
            })
        }, 'activity', 'nav')
    }
})