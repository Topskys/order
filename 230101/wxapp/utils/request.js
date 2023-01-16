// request封装
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
            success: res => resolve(res.data),
            fail: err => reject(err),
            complete: () => wx.hideLoading(),
        })
    })
}

export default request