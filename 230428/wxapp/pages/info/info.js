import checkAuth, {
    logout
} from "../../utils/auth"
import request from "../../utils/request"


Page({
    data: {
        userInfo: wx.getStorageSync('userInfo'),
    },
    // 提交表单
    onSubmit(e) {
        checkAuth(() => {
            request({
                url: `user/${this.data.userInfo._id}`,
                method: 'put',
                data: {
                    ...this.data.userInfo,
                    ...e.detail.value
                }
            }).then(() => {
                request({
                    url: 'user/verify'
                }).then(res => {
                    wx.setStorageSync('userInfo', res.userInfo)
                    this.setData({
                        userInfo: wx.getStorageSync('userInfo')
                    })
                    wx.showToast({
                        title: res.msg,
                        icon: 'none',
                    })
                })
            })
        }, 'info', 'nav')
    },
    // 退出登录
    logout() {
        logout()
    }

})