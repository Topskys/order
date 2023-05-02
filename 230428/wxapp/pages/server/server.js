// pages/server/server.js
import request from '../../utils/request'
import checkAuth from '../../utils/auth'

Page({
    data: {
        createdAt:new Date().toLocaleString(),
        inputVal: '',
        chatContent: [{
                id: 1,
                author: 'customer',
                content: "你好，我的订单出了吗？",
                createdAt: "2023-4-29"
            },
            {
                id: 2,
                author: 'server',
                content: "请稍安勿躁，您的订单已经在配送中",
                createdAt: "2023-4-29"
            },
            {
                id: 1,
                author: 'customer',
                content: "那，大概多久能到？",
                createdAt: "2023-4-29"
            },
            {
                id: 2,
                author: 'server',
                content: "亲，预计需要28分钟呢",
                createdAt: "2023-4-29"
            },
            {
                id: 1,
                author: 'customer',
                content: "这也太久了吧！",
                createdAt: "2023-4-29"
            },
            {
                id: 2,
                author: 'server',
                content: "大哥，",
                createdAt: "2023-4-29"
            },
            {
                id: 2,
                author: 'server',
                content: "这下雨天的，能送就不错了",
                createdAt: "2023-4-29"
            },
            {
                id: 1,
                author: 'customer',
                content: "垃圾",
                createdAt: "2023-4-29"
            },
            {
                id: 2,
                author: 'server',
                content: "这外卖你还要不要了",
                createdAt: "2023-4-29"
            },
            {
                id: 1,
                author: 'customer',
                content: "哥，哥，要",
                createdAt: "2023-4-29"
            },
            {
                id: 1,
                author: 'customer',
                content: "这是气话，别往心里去",
                createdAt: "2023-4-29"
            },
            {
                id: 2,
                author: 'server',
                content: "算你识相",
                createdAt: "2023-4-29"
            },
            {
                id: 2,
                author: 'server',
                content: "外卖放门口了，你自己来取，狗吃了我可不管",
                createdAt: "2023-4-29"
            },
        ],
        flag: true,
    },
    // 监听输入框的变化
    onInput(e) {
        this.setData({
            inputVal: e.detail.value
        })
    },
    // 发送按钮事件
    onSend() {
        checkAuth(() => {
            this.data.inputVal && request({
                url: '/server',
                method: 'post',
                data: this.data.inputVal,
            })
        }, 'server')
    },
    // 获取聊天内容
    getChatContent() {
        while (this.data.flag) {
            setTimeout(() => {
                checkAuth(() => {
                    request({
                        url: '/server'
                    }).then(res => {
                        this.setData({
                            chatContent: res.data || []
                        })
                    })
                }, 'server')
            }, 500)
        }
    },
    onLoad(options){
        checkAuth()
    },
    onShow() {
        // this.getChatContent()
    },
    onUnload() {
        this.setData({
            flag: false
        })
    }
})