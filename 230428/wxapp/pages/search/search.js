// pages/search/search.js
import {
    formatSaleNum
} from '../../utils/util'

Page({

    data: {
        inputVal: '',
        products: [],
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
    // 监听输入框
    onChange(e) {
        this.setData({
            inputVal: e.detail
        })
    },
    // 搜索
    onSearch() {
        // request({
        //     url: 'search',
        //     data: {
        //         keyword: this.data.inputVal.trim()
        //     }
        // }).then(({
        //     data
        // }) => {
            // const arr = data || []
            const arr = [...this.data.leftList,...this.data.rightList]
            arr.forEach(item => (item.sale_num = formatSaleNum(item.sale_num)))
            this.setData({
                leftList: arr.slice(0,Math.ceil(arr.length/2 )),
                rightList: arr.slice(Math.floor(arr.length/2 ),)
            })
        // })
    },
    // 取消搜索
    onCancel() {
        wx.navigateBack({
            delta: 1,
        })
    },
    // 跳转详情
    toDetail(e){
        const item=e.currentTarget.dataset.item
        wx.navigateTo({
          url: `/pages/detail/detail?_id=${item._id}`,
        })
    },
    onLoad(options) {

    },
    onReady() {

    },
    onShow() {
        this.onSearch()
    },
    onReachBottom() {

    },

})