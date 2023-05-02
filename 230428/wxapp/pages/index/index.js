// index.js

import checkAuth from "../../utils/auth"

// 获取应用实例
const app = getApp()

Page({
    data: {
        location: "上海",
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
            "https://ts1.cn.mm.bing.net/th?id=ABT5F805E56E027D0E8BF203231B8AAB9F056F4BAC6BA118ABD9031F73AA0E81B84&w=120&h=120&c=1&rs=1&qlt=80&o=6&dpr=1.5&pid=SANGAM",
            "https://ts3.cn.mm.bing.net/th?id=ABT7C13897317FFD5FEE094BCD9DD17097E24F226002C93DB310CAF0FFBDF738196&w=120&h=120&c=1&rs=1&qlt=80&o=6&dpr=1.5&pid=SANGAM",
            "https://cn.bing.com/rp/9pbbh3cSP4648TvJM1LY_0x72W4.png",
            "https://img2.baidu.com/it/u=2613853606,795500634&fm=253&fmt=auto&app=138&f=JPEG?w=1000&h=500",
        ],
        navList: [{
                label: "保姆",
                poster: "/images/nanny.png"
            },
            {
                label: "中式收纳",
                poster: "/images/manage.png"
            },
            {
                label: "搬家服务",
                poster: "/images/move.png"
            },
            {
                label: "找人做饭",
                poster: "/images/cook.png"
            },
            {
                label: "保姆",
                poster: "/images/nanny.png"
            },
            {
                label: "中式收纳",
                poster: "/images/manage.png"
            },
            {
                label: "搬家服务",
                poster: "/images/move.png"
            },
            {
                label: "找人做饭",
                poster: "/images/cook.png"
            }
        ],
    },
    onLoad() {

    },
    // 跳转搜索、客服事件
    navTo(e) {
        const url = e.currentTarget.dataset.url
        // checkAuth(() => {
            wx.navigateTo({
                url: `/pages/${url}/${url}`,
            })
        // }, url)
    }


})