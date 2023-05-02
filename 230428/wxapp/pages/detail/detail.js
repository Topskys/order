import checkAuth from "../../utils/auth"
import request from "../../utils/request"

// pages/detail/detail.js
Page({

    data: {
        // 关注图标
        like: "like-o",
        noticeList:["价格保障","质量保障","纠纷无忧","意外保险"],
        // 当前商品
        product: {
            _id: '8888888888888888',
            title: '苹果MacBoook Pro 16笔记本维修',
            startPrice: 30,
            sale_num: 3576,
            description: '服务须知。很简单交换机啊是萨克的大姐夫维护VR五二后货架更明显是框架内就基本韩国嗯人家那就是并且文化方便合格下午好成功过为婚外情想昵称被国务院鱼呢喝喝茶而且小姐妹编辑侧和U为以你们放飞机',
            imgs: ["/images/test-01.jpg", "/images/test-02.jpg", "/images/test-03.jpg"],
            comments: [{
                    avatarUrl: "https://thirdwx.qlogo.cn/mmopen/vi_32/OqbjGV9UibfRJj3d4Dia0MCk9Hx6Pr7NgDlibN8JTiaM9e8TSAx6Rynoyhpusl2RBw4kGlEMxOUEZ449bedX6Eicguw/132",
                    nickName: 'Topsky',
                    star: 4,
                    phone: "18200001234",
                    star_count: 5,
                    content: "很简单交换机啊是萨克的大姐夫维护VR五二后货架更明显是框架内就基本韩国嗯人家那就是并且文化方便合格下午好成功过为婚外情想昵称被国务院鱼呢喝喝茶而且小姐妹编辑侧和U为以你们放飞机",
                    createdAt: "2023-4-27"
                },
                {
                    avatarUrl: "https://thirdwx.qlogo.cn/mmopen/vi_32/OqbjGV9UibfRJj3d4Dia0MCk9Hx6Pr7NgDlibN8JTiaM9e8TSAx6Rynoyhpusl2RBw4kGlEMxOUEZ449bedX6Eicguw/132",
                    nickName: 'Topsky',
                    star: 3,
                    phone: "18200001234",
                    star_count: 5,
                    content: "很简单交换机啊是萨克的大姐夫维护VR五二后货架更明显是框架内就基本韩国嗯人家那就是并且文化方便合格下午好成功过为婚外情想昵称被国务院鱼呢喝喝茶而且小姐妹编辑侧和U为以你们放飞机",
                    createdAt: "2023-4-27"
                },
                {
                    avatarUrl: "https://thirdwx.qlogo.cn/mmopen/vi_32/OqbjGV9UibfRJj3d4Dia0MCk9Hx6Pr7NgDlibN8JTiaM9e8TSAx6Rynoyhpusl2RBw4kGlEMxOUEZ449bedX6Eicguw/132",
                    nickName: 'Topsky',
                    star: 1,
                    phone: "18200001234",
                    star_count: 5,
                    content: "很简单交换机啊是萨克的大姐夫维护VR五二后货架更明显",
                    createdAt: "2023-4-27"
                },
                {
                    avatarUrl: "https://thirdwx.qlogo.cn/mmopen/vi_32/OqbjGV9UibfRJj3d4Dia0MCk9Hx6Pr7NgDlibN8JTiaM9e8TSAx6Rynoyhpusl2RBw4kGlEMxOUEZ449bedX6Eicguw/132",
                    nickName: 'Topsky',
                    star: 5,
                    phone: "18200001234",
                    star_count: 5,
                    content: "很简单交换机啊是萨克的大姐夫维护VR五二后货架更明显是框架内就基本韩国嗯人家那就是并且文化方便合格下午好成功过为婚外情想昵称被国务院鱼呢喝喝茶而且小姐妹编辑侧和U为以你们放飞机VB和GV神盾局个和v的模拟四等分的吧 点击的地方那部分 表达式包浆豆腐百分百局",
                    createdAt: "2023-4-27"
                }
            ],
            selections: [{
                    title: '手机号到付件那是根本不能说VB',
                    price: 69.99
                },
                {
                    title: '豹女成本南北朝向内部的成绩单',
                    price: 79.99
                },
                {
                    title: "保存电脑版苍南县并v成内部",
                    price: 89.89
                }, {
                    title: "内存是和比女性把新农村吧VB许昌南",
                    price: 99.98
                }
            ],
        },
        // popup弹窗
        showPopup: false,
        // 选中服务
        selActive: 0,
        // 当前商品操作所需的数据
        selProduct: {
            productId: null,
            selTitle: null,
            selPrice: null,
        },
    },
    onLoad(options) {
        const _id = options.productId
        wx.setStorageSync('detail_product_id', _id)
        this.getProDetail(_id)
    },
    onShow() {

    },
    // 请求商品详情数据
    getProDetail(id) {
        const _id = id || this.data.product._id || wx.getStorageSync("detail_product_id")
        request({
            url: `detail/${_id}`
        }).then(res => {
            this.setData({
                product: res.data || {}
            })
        }).finally(() => {
            this.setSelProduct()
        })
    },
    // 控制popup显隐
    onShowPopup() {
        this.setData({
            showPopup: !this.data.showPopup
        })
    },
    // 选择服务
    onSelect(e) {
        const item = e.currentTarget.dataset.item
        const index = e.currentTarget.dataset.index
        this.setData({
            selActive: index || 0,
        })
        this.setSelProduct(item)
    },
    // 设置当前选择商品规格
    setSelProduct(data) {
        this.setData({
            selProduct: {
                productId: this.data.selProduct.productId || this.data.product._id,
                selTitle: data.title || this.data.product.selections[0].title,
                selPrice: data.price || this.data.product.selections[0].price
            }
        })
    },
    // 关注
    onLike() {
        checkAuth(() => {
            this.setData({
                like: this.data.like.includes("like-o") ? "like" : "like-o"
            })
            this.updateLike({
                like: !this.data.product.like
            }).then(res => {
                wx.showToast({
                    title: res.msg,
                    icon: 'success',
                })
            })
        }, 'order')
    },
    // 修改商品信息
    updateLike(params = {}) {
        return request({
            url: `like/${this.data.product._id}`,
            method: 'put',
            data: {
                ...this.data.product,
                ...params
            }
        })
    },
    // 立即预约
    onOrder() {
        checkAuth(() => {
            request({
                url: 'order',
                method: 'post',
                data: {
                    ...this.data.selProduct
                }
            }).then(res => {
                code == 200 && wx.navigateTo({
                    url: `/pages/pay/pay?productId=${this.data.product._id}`,
                })
            })
        }, 'order')
    },
})