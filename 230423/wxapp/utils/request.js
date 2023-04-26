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
                authorization: "Bearer " + (wx.getStorageSync('token') || ''),
            },
            timeout: options.timeout || 5000,
            success: res => resolve(res.data),
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