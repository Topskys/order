// pages/collection/collection.js
import request from '../../utils/request'

Page({
    data: {
        query: {
            page: 1,
            pageSize: 10,
        },
        collections: [
            {
                title: "1中式保洁打电话说得跟人",
                description: '好进电饭煲人挤人十几年后检测本人和饥饿感存储把南北高架吧让你爸从底层你随便大S诶人们他人恶如呢日本超级好吃不加粗',
                poster: "/images/gril.jpg"
            },
            {
                title: "2中式保洁打电话说得跟人",
                description: '好进电饭煲人挤人十几年后检测本人和饥饿感存储把南北高架吧让你爸从底层你随便大S诶人们他人恶如呢日本超级好吃不加粗',
                poster: "/images/gril.jpg"
            },
        ],
    },
    onLoad() {

    },
    onReady() {

    },
    onShow() {
        // !collections.length && this.getDataList()
    },
    onUnload() {

    },
    onPullDownRefresh() {

    },
    onReachBottom() {

    },
    // 获取列表数据
    getDataList() {
        request({
            url: 'user/colletcion',
            data: this.data.query,
        }).then(({
            code,
            data,
            msg
        }) => {
            code == 200 && this.setData({
                collections: data || []
            })
        })
    },
    //  跳转详情事件
    toDetail(e) {
        const {
            item
        } = e.currentTarget.dataset
        wx.navigateTo({
            url: `/pages/detail/detail?_id=${item._id}`
        })
    }
})