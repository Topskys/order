/**
 * 封装统一请求模块
 * @param { object } options 请求配置
 */
function request(options) {
    const baseUrl = 'http://localhost:3000';

    return new Promise((resolve, reject) => {
        wx.showLoading({
            title: '加载中...'
        })
        wx.request({
            ...options,
            url: `${baseUrl}/${options.url}`,
            method: options.method || 'get',
            header: {
                authorization: wx.getStorageSync('token'),
            },
            timeout: options.timeout || 5000,
            success: ({
                data
            }) => {
                if (data.code !== 200) {
                    if (data.code == 401) {
                        wx.navigateTo({
                            url: '/pages/login/login'
                        })
                    }
                    wx.showToast({
                        title: data.msg,
                        icon: 'error'
                    })
                }
                resolve(data)
            },
            fail: err => {
                wx.showToast({
                    title: err,
                    icon: 'error',
                })
                reject(err)
            },
            complete: () => wx.hideLoading(),
        })
    })
}

export default request