// index.js
import checkAuth from "../../utils/auth"

// 获取应用实例
const app = getApp()

Page({
    data: {
        location: app.globalData.location ,
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
        navList: [{
                label: "MacBook",
                poster: "/images/08.jpg"
            },
            {
                label: "ipad",
                poster: "/images/09.jpg"
            },
            {
                label: "台式电脑",
                poster: "/images/10.jpg"
            },
            {
                label: "热水壶",
                poster: "/images/16.jpg"
            },
            {
                label: "莱卡",
                poster: "/images/12.jpg"
            },
            {
                label: "冰箱",
                poster: "/images/13.jpg"
            },
            {
                label: "电磁炉",
                poster: "/images/17.jpg"
            },
            {
                label: "电饭煲",
                poster: "/images/15.jpg"
            }
        ],
        leftList: [{
                title: '热水壶独孤皇后的共和国包含的VB并VS大V拨打改并v发VVCVG电视电话不并v打包后',
                price: 39.99,
                poster: '/images/detail-01.jpg',
                sale_num: 18090
            },
            {
                title: '热水壶独孤皇后的共和国包含的VB并VS大V拨打改并v发VVCVG电视电话不并v打包后',
                price: 99.99,
                poster: '/images/01.jpg',
                sale_num: 39090
            },
            {
                title: '热水壶独孤皇后的共和国包含的VB并VS大V拨打改并v发VVCVG电视电话不并v打包后',
                price: 99.99,
                poster: '/images/01.jpg',
                sale_num: 39090
            },
            {
                title: '热水壶独孤皇后的共和国包含的VB并VS大V拨打改并v发VVCVG电视电话不并v打包后',
                price: 99.99,
                poster: '/images/01.jpg',
                sale_num: 39090
            },
        ],
        rightList: [{
                title: '热水壶独孤皇后的共和国包含的VB并VS大V拨打改并v发VVCVG电视电话不并v打包后',
                price: 99.99,
                poster: '/images/01.jpg',
                sale_num: 39090
            },
            {
                title: '热水壶独孤皇后的共和国包含的VB并VS大V拨打改并v发VVCVG电视电话不并v打包后',
                price: 99.99,
                poster: '/images/01.jpg',
                sale_num: 39090
            },
            {
                title: '热水壶独孤皇后的共和国包含的VB并VS大V拨打改并v发VVCVG电视电话不并v打包后',
                price: 39.99,
                poster: '/images/detail-01.jpg',
                sale_num: 18090
            }
        ],
    },
    onLoad() {

    },
    onShow() {
        this.setData({
            location: app.globalData.location 
        })
    },
    // 选择服务位置
    onChange(e){
        app.globalData.location=e.detail
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
    toClass(e){
        const item = e.currentTarget.dataset.item
        wx.switchTab({
          url: '/pages/class/class',
        })
    },
    // 跳转详情
    toDetail(e) {
        const item = e.currentTarget.dataset.item
        wx.navigateTo({
            url: `/pages/detail/detail?productId=${item._id}`,
        })
    },
    // 获取关注列表
    getDataList() {
        checkAuth(() => {
            request({
                url: 'like'
            }).then(res => {
                const arr = res.data || []
                this.setData({
                    leftList: arr.slice(0, arr.length / 2),
                    rightList: arr.slice(arr.length / 2, )
                })
            })
        }, 'like','nav')
    },


})