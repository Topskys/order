const {createClient} = require('redis')


/**
 * Redis 缓存
 */
module.exports = class Cache {

    constructor() {
        this.client = createClient({
            host: "127.0.0.1",	//	redis地址
            port: 6379, // 端口号
            legacyMode: true //redis@v4必须
        })

        this.client.on('error', err => console.error('Redis Error: ', err))
        this.client.on('connect', () => console.log(new Date().toLocaleString(), 'Redis is connected'))
        this.client.on('end', () => console.log('Redis is Closed!'));

        // 检查Redis是否连接
        this.client.isOpen ? console.log('Redis is connected') : this.client.connect().catch(err => console.error('Redis Error: ', err))
    }


    /**
     * 设置Redis缓存
     * @param key 属性名
     * @param value 属性值
     * @param expire 过期时间（second秒）
     * @returns {Promise<unknown>}
     */
    set(key, value, expire) {
        typeof value === 'object' && (value=JSON.stringify(value))

        return new Promise((resolve, reject) => {
            this.client.set(key, value, function(err, result){

                if (err) reject(err)

                (!isNaN(expire) && expire > 0) && client.expire(key, parseInt(expire)); //如果expire存在的话，再设置一下这个键值对的过期时间

                resolve(result)
            })
        })
    }


    /**
     * 取出Redis缓存
     * @param key 属性名，也就是键值对的键名
     * @returns {Promise<unknown>}
     */
    get(key) {
        return new Promise((resolve, reject) => {
            this.client.get(key, function (err, result) {

                if (err) reject(err)

                resolve(result)
            })
        })
    }


    /**
     * 删除Redis缓存
     * @param key 属性名
     * @returns {Promise<unknown>}
     */
    del(key) {
        return new Promise((resolve, reject) => {
            this.client.del(key, function (err, result) {

                if (err) reject(err)

                resolve(result)
            })
        })
    }


}

