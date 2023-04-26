// pages/login/login.js
import request from '../../utils/request.js'


Page({
    data: {
        // login: {
        //     username: 'Topsky',
        //     password: '123456',
        // }
        logoTitle:getApp().globalData.logoTitle
    },
    /* 监听键盘输入事件 */
    // onInput(e) {
    //     const where = e.currentTarget.dataset.where
    //     this.setData({
    //         login: {
    //             username: where.includes('1') ? e.detail.value : this.data.login.username,
    //             password: where.includes('2') ? e.detail.value : this.data.login.password
    //         }
    //     })
    // },
    /* 登录回调事件 */
    onSubmit(e) {
        const form = e.detail.valkue
        const valid = (data, cb) => {
            const showError = (msg) => {
                wx.showToast({
                    title: msg,
                    icon: 'error',
                })
                return
            }
            if (!data?.username) return showError('请输入正确的账号')
            if (data.password.length < 6) return showError('密码长度需>=6')
            cb && cb()
        }
        valid(form, () => request({
            url: 'wx/login',
            data: form,
            method: "POST"
        }).then(({
            code,
            msg
        }) => {
            code === 200 && wx.switchTab({
                url: '/pages/index/index',
                complete: (res) => {
                    const message = msg
                    wx.showToast({
                        title: message,
                        icon: 'success',
                    })
                },
            })
        }))
    },
    /**
     * sign up 事件
     */
    linkTo() {
        wx.navigateTo({
            url: '/pages/register/register'
        })
    }

})