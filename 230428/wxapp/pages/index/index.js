// index.js
import checkAuth from "../../utils/auth"
import request from "../../utils/request"

// 获取应用实例
const app = getApp()

Page({
    data: {
        location: app.globalData.location,
        locations: [{
            text: "上海",
            value: "上海"
        }, {
            text: "福州",
            value: "福州"
        }, {
            text: "闽侯",
            value: "闽侯"
        }, {
            text: "长乐",
            value: "长乐"
        }, {
            text: "连江",
            value: "连江"
        }, {
            text: "福清",
            value: "福清"
        }, {
            text: "莆田",
            value: "莆田"
        }],
        keyword: '',
        banners: [
            "https://img2.baidu.com/it/u=3152494818,2600676684&fm=253&fmt=auto&app=138&f=JPEG?w=582&h=389",
            "https://www.jiamengfei.com/uploads/images/2019/09-11/b43fb8ff69c4.jpg",
            "https://source1.suddenfix.com/articlePic/2cdc6b7f7d77fc709430865c1f69fb68.jpg",
            "https://img0.baidu.com/it/u=1069957418,2217919900&fm=253&fmt=auto&app=138&f=JPG?w=810&h=500",
        ],
        navList: [],
        leftList: [],
        rightList: [],
    },
    onLoad() {

    },
    onShow() {
        this.setData({
            location: app.globalData.location
        })
        this.getClass()
        this.getDataList()
    },
    // 获取分类列表
    getClass() {
        request({
            url: 'class'
        }).then(({
            data
        }) => {
            this.setData({
                navList: data.slice(0,8) || []
            })
        })
    },
    // 选择服务位置
    onChange(e) {
        app.globalData.location = e.detail
        wx.setStorageSync('location', e.detail)
    },
    // 跳转搜索、客服事件
    navTo(e) {
        const url = e.currentTarget.dataset.url
        checkAuth(() => {
            wx.navigateTo({
                url: `/pages/${url}/${url}`,
            })
        }, url)
    },
    // 跳转分类
    toClass(e) {
        const item = e.currentTarget.dataset.item
        wx.switchTab({
            url: '/pages/class/class',
        })
    },
    // 跳转详情
    toDetail(e) {
        const item = e.currentTarget.dataset.item
        wx.navigateTo({
            url: `/pages/detail/detail?product_id=${item._id}`,
        })
    },
    // 获取关注列表
    getDataList() {
        request({
            url: 'product'
        }).then(res => {
            const [arr,arr0,arr1]=[res.data||[],[],[]]
                arr.map((item, i) => (i > 0 && i % 2) ? arr1.push(item) : arr0.push(item))
                this.setData({
                    leftList: arr0,
                    rightList: arr1
                })
        })
    },


})