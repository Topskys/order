/**
 * 用户登录信息操作模块
 */
import request from './request';


// 新增本地存储
const setStorage = (val, key = 'userInfo') => wx.setStorageSync(key, val)

// 获取本地存储
const getStorage = (key = 'userInfo') => wx.getStorageSync(key)

// 移除本地存储
const delStorage = (key = 'userInfo') => wx.removeStorageSync(key)

/**
 * 用户信息验证
 */
const verify = () => request({
    url: 'users/verify',
    method: 'post'
}).then(({
    code,
    userInfo
}) => code === 200 && setStorage(userInfo))


module.exports = {
    verify: verify,
    setStorage: setStorage,
    getStorage: getStorage,
    delStorage: delStorage
}