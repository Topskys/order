/**
 * 数据效验
 * data: String、Number、Boolean、Null、Undefined、Symbol、BigInt (8)
 */


/**
 * 判空
 * @param params any
 */
function isEmpty(params) {
    const resp = (data=null, result = false) => {
        // result = data ? true : false
        return result
    }

    const resp1 = (data=null, result = false) => {
        result = data ? true : false
        return result
    }

    const type_arr = [
        {
            type: '[object Array]',
            cb: (data) => {
                console.log('arr---', data)
                resp(null, JSON.stringify(data) !== '[]')
            }
        },
        {
            type: '[object Object]',
            cb: (data) => resp(null, JSON.stringify(data) !== '{}')
        }
    ]

    const is = data => Object.prototype.toString.call(data);

    return  ['Array', 'Object'].includes(is(params)) ? type_arr.forEach(o => is(params) === o.type && o.cb(params)) : resp1(params)
}


module.exports = {
    isEmpty,
}


