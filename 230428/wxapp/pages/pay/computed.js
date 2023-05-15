/**
 * 获取数组最大值
 * @param {Array} arr []
 */
export const getMax = (arr = []) => {
    return arr.sort(function (a, b) {
        return a - b
    })[arr.length - 1]
}


/**
 * 计算实际付款
 * @param {*} price 价格
 */
export function computed(price) {
    const arr = wx.getStorageSync('userInfo').discount || []
    typeof price != 'number' && (price = Number(price))
    return arr.length ? Number((price - getMax(arr)).toFixed(2)) : price
}