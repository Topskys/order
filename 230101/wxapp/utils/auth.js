/*
 * 鉴权
 */
function CheckAuth(callback) {
    wx.getStorageSync('phone') ? callback() : wx.navigateTo({
        url: `/pages/${wx.getStorageSync('token')?'telform/telform':'auth/auth'}`,
    })
}

export default CheckAuth