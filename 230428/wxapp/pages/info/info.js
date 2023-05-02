import { logout } from "../../utils/auth"

// pages/info/info.js
Page({

    /**
     * 页面的初始数据
     */
    data: {

    },
    onLoad(options) {

    },
    onShow() {

    },
    // 退出登录
    logout(){
        logout()
    }

})