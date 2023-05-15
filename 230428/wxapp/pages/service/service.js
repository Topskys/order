// pages/server/server.js
import request from '../../utils/request'
import checkAuth from '../../utils/auth'
const app = getApp()

Page({
    data: {
        createdAt: new Date().toLocaleString(),
        inputVal:'',
        chatContent: [],
        flag: false,
        userInfo: app.globalData.userInfo
    },
    // 发送按钮事件
    onSubmit(e) {
        this.setFlag(false)
        const {content}=e.detail.value
        console.log(e.detail)
        checkAuth(() => {
            content ? request({
                url: 'chat/user',
                method: 'post',
                data: {
                    content
                },
            }).finally(() => {
                this.setData({
                    inputVal:''
                })
                this.setFlag(true)
                this.getChatContent()
            }) : wx.showToast({
                title: "请输入...",
                icon: 'none'
            })
        }, 'server', 'nav')
    },
    // 获取聊天内容
    getChatContent() {
        // while (this.data.flag) {
        //     setTimeout(() => {
        checkAuth(() => {
            request({
                url: `chat/${this.data.userInfo._id}`
            }).then(res => {
                this.setData({
                    chatContent: res.data || []
                })
            })
        }, 'server', 'nav')
        //     }, 500)
        // }
    },
    setFlag(val) {
        this.setData({
            flag: val || false
        })
    },
    onLoad(options) {
        checkAuth()
    },
    onShow() {
        this.setFlag(true)
        this.getChatContent()
    },
    onUnload() {
        this.setFlag(false)
    }
})