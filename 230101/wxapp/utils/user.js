/*
 * 用户登录信息模块
 */
function setStorage(key, val) {
    wx.setStorageSync(key, JSON.stringify(val))
}

function getStorage(key) {
    return JSON.parse(wx.getStorageSync(key) || '')
}

function delStorage(key) {
    wx.removeStorage({
        key
    })
}




module.exports = {
    setStorage: setStorage,
    getStorage: getStorage,
    delStorage: delStorage
}