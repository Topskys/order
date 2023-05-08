// pages/class/class.js
import request from '../../utils/request'
const app = getApp()

Page({

    data: {
        tabActive: app.globalData.curr_class_tab || 0,
        sideActive: app.globalData.curr_class_side || 0,
        sideMenus: [{
                _id: 1,
                label: "笔记本",
            },
            {
                _id: 2,
                label: "电饭煲",
            },
            {
                _id: 3,
                label: "手机",
            },
            {
                _id: 4,
                label: "冰箱",
            },
            {
                label: "电风扇",
            },
            {
                label: "扫地机",
            },
            {
                label: "家电维修",
            }
        ],
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
        }, {
            title: '新人专享红包',
            discount_size: 9,
        }, {
            title: '新人专享红包',
            discount_size: 16,
        }, {
            title: '新人专享红包',
            discount_size: 10,
        }, {
            title: '新人专享红包',
            discount_size: 0.5,
        }, {
            title: '新人专享红包',
            discount_size: 12,
        }, {
            title: '新人专享红包',
            discount_size: 6,
        }, {
            title: '新人专享红包',
            discount_size: 3,
        }]
    },
    onShow() {
        // !this.data.sideMenus.length && this.getSideMenus()
        // this.data.sideMenus.length && this.getSideMenus()
        this.setData({
            tabActive: app.globalData.curr_class_tab || 0,
            sideActive: app.globalData.curr_class_side || 0,
        })
    },
    // 侧边栏菜单项点击事件
    onSideChange(e) {
        const item = e.currentTarget.dataset.item
        this.setData({
            sideActive: e.detail
        })
        item._id && this.getDataList(item._id)
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
            url: `/pages/detail/detail?item=${item}`,
        })
    },
    // 请求分类数据
    getDataList(id = this.data.sideMenus[0]._id) {
        request({
            url: `product?classId=${id}`
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