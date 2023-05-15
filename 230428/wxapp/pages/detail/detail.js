import checkAuth from "../../utils/auth"
import request from "../../utils/request"

// pages/detail/detail.js
Page({

    data: {
        // 关注图标
        like: "like-o",
        noticeList: ["价格保障", "质量保障", "纠纷无忧", "意外保险"],
        // 当前商品
        product: {
            selections: [],
        },
        comments: [],
        // popup弹窗
        showPopup: false,
        // 选中服务
        selActive: 0,
        // 当前商品操作所需的数据
        select: {
            service: undefined,
            price: undefined
        },
    },
    onLoad(options) {
        const _id = options.product_id
        wx.setStorageSync('product_id', _id)
        this.getProDetail(_id)
    },
    onShow() {},
    // 请求商品详情数据
    getProDetail(id) {
        const _id = id || this.data.product._id || wx.getStorageSync("product_id")
        request({
            url: `product/${_id}`
        }).then(res => {
            this.setData({
                product: res.data || {}
            })
            this.getComment(_id)
            this.setSelect(res.data.selections[0])
            this.getLike(_id)
        })
    },
    // 获取商品评论信息
    getComment(id) {
        request({
            url: `comment/${id}`
        }).then(({
            data
        }) => {
            this.setData({
                comments: data || []
            })
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
        this.setSelect(item)
        this.onShowPopup()
    },
    // 设置当前选择商品规格
    setSelect(data) {
        this.setData({
            select: {
                service: data.service || this.data.product.selections[0].service,
                price: data.price || this.data.product.selections[0].price
            }
        })
    },
    // 获取关注信息
    getLike(product_id){
        checkAuth(()=>{
            request({
                url:`like/${product_id}`
            }).then(({data})=>{
                if(data._id){
                    this.setData({
                        like:'like'
                    })
                }
            })
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
            }).then(({
                code,
                msg
            }) => {
                wx.showToast({
                    title: msg,
                    icon: 'none',
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
                    ...this.data.select,
                    product_id: this.data.product._id
                }
            }).then(({
                code,
                data,
                msg
            }) => {
                wx.showToast({
                    title: msg,
                    icon: 'none',
                    complete: (res) => {
                        code == 200 && wx.navigateTo({
                            url: `/pages/pay/pay?order_id=${data._id}`,
                        })
                    },
                })
            })
        }, 'order')
    },
})