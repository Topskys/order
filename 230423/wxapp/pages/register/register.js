// pages/register/register.js
import request from '../../utils/request'
Page({
    data:{
        logoTitle:getApp().globalData.logoTitle
    },
    /**
     * 表单注册按钮事件
     * @param {object} e 
     */ 
    onSubmit(e) {
        const form = e.detail.value
        const reg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/
        const valid = (data, cb) => {
            const showError = (msg) => {
                wx.showToast({
                    title: msg,
                    icon: 'error',
                })
                return
            }
            if (!reg.test(Number(data.phone.trim()))) return showError('号码错误')
            if (data.password.length < 6 || data.rePassword.length < 6) return showError('密码长度需>=6')
            if (data.password != data.rePassword) return showError('两次密码不一致')
            cb && cb()
        }
        valid(form, () => request({
            url: 'wx/reg',
            data: form,
            method: "POST",
        }).then(({code,msg})=>{
            code==200 && wx.showToast({
              title: msg,
              icon: 'success',
            })
        }))
    }
})