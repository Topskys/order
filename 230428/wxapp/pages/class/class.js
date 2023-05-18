// pages/class/class.js
import request from '../../utils/request'
import checkAuth from '../../utils/auth'
const app = getApp().globalData

Page({

    data: {
        tabActive: app.curr_class_tab || 0,
        sideActive: app.curr_class_side || 0,
        sideMenus: [],
        products: [],
        disList: []
    },
    onShow() {
        this.getSideMenus()
        this.setData({
            tabActive: app.curr_class_tab,
            sideActive: app.curr_class_side,
        })
        this.getDiscList()
    },
    // 侧边栏菜单项点击事件
    onSideChange(e) {
        const index = e.detail || 0
        this.setData({
            sideActive: index
        })
        this.getDataList(index)
    },
    // 顶部Tabs点击事件
    onTabChange(event) {},
    // 跳转详情
    toDetail(e) {
        const item = e.currentTarget.dataset.item
        wx.navigateTo({
            url: `/pages/detail/detail?product_id=${item._id}`,
        })
    },
    // 请求分类数据
    getDataList(idx = 0) {
        const id = this.data.sideMenus[idx]._id
        request({
            url: `product`,
            data: {
                keyword: id
            }
        }).then(res => {
            this.setData({
                products: res.data || []
            })
        })
    },
    // 获取分类数据
    getSideMenus() {
        request({
            url: 'class'
        }).then(({
            data
        }) => {
            this.setData({
                sideMenus: data || []
            })
            this.getDataList()
        })
    },
    // 获取福利数据
    async getDiscList() {
        this.setData({
            disList: (await request({
                url: 'disc/wx'
            })).data || []
        })
    },
    // 领取福利
    getDisc(e) {
        const item = e.currentTarget.dataset.item
        checkAuth(() => {
            request({
                url: `disc/${item._id}`,
            }).then(({
                msg
            }) => {
                wx.showToast({
                    title: msg,
                    icon: 'none',
                })
            }).catch(() => {
                wx.showToast({
                    title: "领取失败",
                    icon: 'none',
                })
            })
        })
    }
})