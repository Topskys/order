import request from "../../utils/request"
import checkAuth from "../../utils/check.js"

// pages/detail/detail.js
Page({

    data: {
        detail: {
            poster: "/images/detail-01.jpg",
            sale_count: 40266,
            services: [{
                title: '3小时消毒保洁',
                price: 226
            }, {
                title: '4小时消毒保洁',
                price: 296
            }, {
                title: '5小时消毒保洁',
                price: 371
            }, {
                title: '6小时消毒保洁地方的股份否过分发给 好鼓腹含和会很尴尬个',
                price: 466
            }],
            description: '服务须知。很简单交换机啊是萨克的大姐夫维护VR五二后货架更明显是框架内就基本韩国嗯人家那就是并且文化方便合格下午好成功过为婚外情想昵称被国务院鱼呢喝喝茶而且小姐妹编辑侧和U为以你们放飞机',
            imgs: ["/images/test-01.jpg", "/images/test-02.jpg", "/images/test-03.jpg"],
            evaluations: [{
                    avatarUrl: "https://thirdwx.qlogo.cn/mmopen/vi_32/OqbjGV9UibfRJj3d4Dia0MCk9Hx6Pr7NgDlibN8JTiaM9e8TSAx6Rynoyhpusl2RBw4kGlEMxOUEZ449bedX6Eicguw/132",
                    nickName: 'Topsky',
                    gender: 1,
                    phone: "18200001234",
                    star_count: 5,
                    content: "很简单交换机啊是萨克的大姐夫维护VR五二后货架更明显是框架内就基本韩国嗯人家那就是并且文化方便合格下午好成功过为婚外情想昵称被国务院鱼呢喝喝茶而且小姐妹编辑侧和U为以你们放飞机",
                    createdAt: "2023-4-27"
                },
                {
                    avatarUrl: "https://thirdwx.qlogo.cn/mmopen/vi_32/OqbjGV9UibfRJj3d4Dia0MCk9Hx6Pr7NgDlibN8JTiaM9e8TSAx6Rynoyhpusl2RBw4kGlEMxOUEZ449bedX6Eicguw/132",
                    nickName: 'Topsky',
                    gender: 0,
                    phone: "18200001234",
                    star_count: 5,
                    content: "很简单交换机啊是萨克的大姐夫维护VR五二后货架更明显是框架内就基本韩国嗯人家那就是并且文化方便合格下午好成功过为婚外情想昵称被国务院鱼呢喝喝茶而且小姐妹编辑侧和U为以你们放飞机",
                    createdAt: "2023-4-27"
                },
                {
                    avatarUrl: "https://thirdwx.qlogo.cn/mmopen/vi_32/OqbjGV9UibfRJj3d4Dia0MCk9Hx6Pr7NgDlibN8JTiaM9e8TSAx6Rynoyhpusl2RBw4kGlEMxOUEZ449bedX6Eicguw/132",
                    nickName: 'Topsky',
                    gender: 0,
                    phone: "18200001234",
                    star_count: 5,
                    content: "很简单交换机啊是萨克的大姐夫维护VR五二后货架更明显是框架内就基本韩国嗯人家那就是并且文化方便合格下午好成功过为婚外情想昵称被国务院鱼呢喝喝茶而且小姐妹编辑侧和U为以你们放飞机",
                    createdAt: "2023-4-27"
                },
                {
                    avatarUrl: "https://thirdwx.qlogo.cn/mmopen/vi_32/OqbjGV9UibfRJj3d4Dia0MCk9Hx6Pr7NgDlibN8JTiaM9e8TSAx6Rynoyhpusl2RBw4kGlEMxOUEZ449bedX6Eicguw/132",
                    nickName: 'Topsky',
                    gender: 1,
                    phone: "18200001234",
                    star_count: 5,
                    content: "很简单交换机啊是萨克的大姐夫维护VR五二后货架更明显是框架内就基本韩国嗯人家那就是并且文化方便合格下午好成功过为婚外情想昵称被国务院鱼呢喝喝茶而且小姐妹编辑侧和U为以你们放飞机",
                    createdAt: "2023-4-27"
                }
            ],
        },
        cardActive: 0,
        // 当前选择的服务
        currSelect: {},
        tabActive: 0,
    },
    // 选择服务事件
    onSelect(e) {
        this.setData({
            cardActive: e.currentTarget.dataset.index || 0,
            currSelect: {
                ...e.currentTarget.dataset.item,
                title: e.currentTarget.dataset.item.title,
                price: e.currentTarget.dataset.item.price
            }
        })
    },
    // change tab
    onChange(e) {
        this.setData({
            tabActive: e.detail.index || 0
        })
    },
    onLoad(options) {
        const id = options?.productId || wx.getStorageSync("current_productId")
        this.getDetailInfo(id)
    },
    onShow() {

    },
    // 获取详情信息
    getDetailInfo(productId) {
        request({
            url: `detail/${productId||wx.getStorageSync('current_productId')}`
        }).then((res) => {
            this.setData({
                detail: res.data || {}
            })
        })
    },
    // 客服
    onService() {
        checkAuth(() => {
            wx.navigateTo({
                url: `/images/service/service?redirect=servce&rediType=nav`,
            })
        }, 'service', 'nav')
    },
    // 加入收藏
    onCollect() {
        checkAuth(() => {
            request({
                url: "favorite",
                method: 'post',
                data: this.data.detail,
            }).then(res => {
                wx.showToast({
                    title: res.msg,
                    icon: 'none',
                })
            })
        }, 'service', 'nav')
    },
    // 立即预约
    onOrder() {
        checkAuth({
            url: 'order',
            method: 'post',
            data: {
                ...this.data.detail,
                ...this.data.currSelect,
            }
        }).then(({
            code,
            msg,
            data
        }) => {
            if (code === 200) {
                wx.setStorageSync('current_order', data)
                wx.navigateTo({
                    url: `/pages/ready/ready?orderId=${data._id}`,
                })
            }
        },'index')
    },

})