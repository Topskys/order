/**
 * 计算价格
 * @param {*} price 价格
 * @param {*} arr 优惠劵数组
 */
export function computedPrice(price) {
    if (typeof price != 'number') {
        price = Number(price)
    }
    const userInfo = wx.getStorageSync('userInfo')
    const arr = userInfo.discount || []
    return Number((arr.length > 0 ? (price - Math.max(...arr)) : price).toFixed(2))
}