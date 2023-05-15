import checkAuth from "../../utils/check"
import request from "../../utils/request"

// pages/message/message.js
Page({

    data: {
        list: []
    },
    onShow() {
        // 获取留言列表
        checkAuth(async () => {
            this.setData({
                list: (await request({
                    url: 'contact'
                })).data || []
            })
        }, 'message', 'nav')
    },
})