import {getInfo} from "../../utils/auth"



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
    var arr = wx.getStorageSync('userInfo').discount || []
    var res = arr.sort(function (a, b) {
        return Number(a.money_size) - Number(b.money_size)
    })[arr.length - 1]
    var actual_pay = price
    if (arr.length > 0 && price) {
        typeof price != 'number' && (price = Number(price))
        if (price <= Number(res.money_size)) {
            return {
                actual_pay: 0.01,
                disc: res.money_size,
                disc_id: res._id,
            }
        } else {
            actual_pay = Number((price - Number(res.money_size)).toFixed(2))
            return {
                actual_pay,
                disc: res.money_size,
                disc_id: res._id,
            }
        }
    } else {
        return {
            actual_pay,
        }
    }
}