// pages/class/class.js
import request from '../../utils/request'
const app = getApp()

Page({

    data: {
        tabActive: app.globalData.curr_class_tab || 0,
        sideActive: app.globalData.curr_class_side || 0,
        sideMenus: [],
        products: [{
                classId: 1,
                poster: '/images/girl.jpg',
                label: '空调',
            },
            {
                classId: 2,
                poster: '/images/detail-01.jpg',
                label: '冰箱',
            },
            {
                classId: 3,
                poster: '/images/01.jpg',
                label: '空调',
            },
            {
                poster: '/images/detail-01.jpg',
                label: '冰箱',
            },
            {
                poster: '/images/01.jpg',
                label: '空调',
            }
        ],
        disList: [{
            title: '新人专享红包',
            discount_size: 2,
        }, {
            title: '新人专享红包',
            discount_size: 6,
        }, {
            title: '新人专享红包',
            discount_size: 5,
        }, {
            title: '新人专享红包',
            discount_size: 8,
        }]
    },
    onShow() {
        // !this.data.sideMenus.length && this.getSideMenus()
        this.getSideMenus()
        this.setData({
            tabActive: app.globalData.curr_class_tab || 0,
            sideActive: app.globalData.curr_class_side || 0,
        })
    },
    // 侧边栏菜单项点击事件
    onSideChange(e) {
        const index = e.detail||0
        this.setData({
            sideActive: index
        })
        this.getDataList(index)
    },
    // 顶部Tabs点击事件
    onTabChange(event) {
        wx.showToast({
            title: `切换到标签 ${event.detail.name}`,
            icon: 'none',
        });
    },
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
                method: 'post',
                data: {
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