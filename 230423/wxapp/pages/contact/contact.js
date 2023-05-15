import checkAuth from "../../utils/check"
import request from "../../utils/request"

// pages/contact/contact.js
const app = getApp()
Page({

    data: {
        kind: "建议",
        serviceNumber: '13876750000',
        userInfo: app.globalData.userInfo
    },
    onLoad(options) {

    },
    onShow() {
        this.setData({
            userInfo: wx.getStorageSync('userInfo')
        })
    },

    // 监听留言类型
    onKindChange(e) {
        console.log(e)
        this.setData({
            kind: e.detail
        })
    },
    onSubmit(e) {
        const {
            contact_type = '', content = ''
        } = e.detail.value
        if (!content) {
            wx.showToast({
                title: "请填写留言内容",
                icon: 'error',
            })
            return
        }
        if (!contact_type) {
            wx.showToast({
                title: "请填写联系方式",
                icon: 'error',
            })
            return
        }
        checkAuth(() => {
            request({
                url: "contact",
                method: "post",
                data: {
                    ...e.detail.value,
                    kind: this.data.kind || "建议",
                    user_id: this.data.userInfo._id
                }
            }).then(res => {
                wx.showToast({
                    title: res.msg,
                    icon: 'none',
                })
                setTimeout(()=>{
                    wx.navigateTo({
                      url: '/pages/message/message',
                    })
                },2000)
            })
        }, 'contact', 'nav')
    },
    // 拨打电话
    onCall() {
        wx.makePhoneCall({
            phoneNumber: this.data.serviceNumber,
            success: (res) => {
                wx.showToast({
                    title: "呼叫成功",
                    icon: 'success',
                })
            },
            fail: (res) => {
                wx.showToast({
                    title: "呼叫失败",
                    icon: 'error',
                })
            }
        })
    }
})