// pages/query.js
import request from '../../utils/request'
Page({

    data: {
        mainActiveIndex: 0,
        activeId: [],
        max: 2,
        trees: [{
                text: '3年经验',
                // 禁用选项
                disabled: false,
                // 该导航下所有的可选项
                children: [{
                        // 名称
                        text: '温州',
                        // id，作为匹配选中状态的标识
                        id: 1,
                        // 禁用选项
                        disabled: true,
                    },
                    {
                        text: '杭州',
                        id: 2,
                    },
                ],
            },
            {
                text: '5年经验',
            }
        ],
        keyList: [{
                label: '3年经验'
            },
            {
                label: '男师傅'
            },
            {
                label: '女师傅'
            },
            {
                label: '初级技师'
            },
            {
                label: '中级技师'
            },
            {
                label: '高级技师'
            },
        ],
        active: 0,
        query:{},
        staffs: [{
                poster: '/images/gril.jpg',
                description: '1111111111112222222222222222222222222222222222222222222222222222',
                price: '98.99',
                sale_count: '23'
            },
            {
                poster: '/images/gril.jpg',
                description: '1111111111112222222222222222222222222222222222222222222222222222',
                price: '98.99',
                sale_count: '23'
            },
            {
                poster: '/images/gril.jpg',
                description: '1111111111112222222222222222222222222222222222222222222222222222',
                price: '98.99',
                sale_count: '23'
            },
            {
                poster: '/images/gril.jpg',
                description: '1111111111112222222222222222222222222222222222222222222222222222',
                price: '98.99',
                sale_count: '23'
            },
            {
                poster: '/images/gril.jpg',
                description: '1111111111112222222222222222222222222222222222222222222222222222',
                price: '98.99',
                sale_count: '23'
            },
            {
                poster: '/images/gril.jpg',
                description: '1111111111112222222222222222222222222222222222222222222222222222',
                price: '98.99',
                sale_count: '23'
            },
            {
                poster: '/images/gril.jpg',
                description: '1111111111112222222222222222222222222222222222222222222222222222',
                price: '98.99',
                sale_count: '23'
            },
            {
                poster: '/images/gril.jpg',
                description: '1111111111112222222222222222222222222222222222222222222222222222',
                price: '98.99',
                sale_count: '23'
            },
            {
                poster: '/images/gril.jpg',
                description: '1111111111112222222222222222222222222222222222222222222222222222',
                price: '98.99',
                sale_count: '23'
            },
            {
                poster: '/images/gril.jpg',
                description: '1111111111112222222222222222222222222222222222222222222222222222',
                price: '98.99',
                sale_count: '23'
            },
            {
                poster: '/images/gril.jpg',
                description: '1111111111112222222222222222222222222222222222222222222222222222',
                price: '98.99',
                sale_count: '23'
            }
        ],
    },
    // 获取列表数据
    getDataList() {
        request({
            url: 'staff',
            data: this.data.query
        }).then((res) => {
            res.code == 200 && this.setData({
                staffs: res.data
            })
        })
    },
    // 点击tabs回调事件
    onChange(e) {
        const {
            callback,
            title
        } = e.detail;
    },
    onShow() {
        // this.getDataList()
    },
    // 点击商品跳转详情
    onItemHandler(e) {
        const item = e.currentTarget.dataset.item || {}
        wx.navigateTo({
            url: `/pages/detail/detail?id=${item._id}`,
        })
    },
    onClickNav({
        detail = {}
    }) {
        this.setData({
            mainActiveIndex: detail.index || 0,
        });
    },

    onClickItem({
        detail = {}
    }) {
        const {
            activeId
        } = this.data;

        const index = activeId.indexOf(detail.id);
        if (index > -1) {
            activeId.splice(index, 1);
        } else {
            activeId.push(detail.id);
        }

        this.setData({
            activeId
        });
    },
})