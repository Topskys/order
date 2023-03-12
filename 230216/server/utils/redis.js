const redis = require('koa-redis')


/**
 * Redis 缓存
 */
class Redis {


    constructor() {
        this._client=this.init()
    }


    // 连接Redis
    init(){
        const client =new redis({}).client()

        client.on('error', (err) => console.log('Redis Error: ', err))

        client.on('connect', () => console.log('Redis is connected'))

        return client
    }



    // 设置Redis
    setRedis(key, value) {
        this._client.set(key, JSON.stringify(value), function (err) {
            if (err) {
                throw Error(`{setRedis：${err}}`)
            } else {
                return 1
            }
        })
    }


    // 获取Redis
    getRedis(key) {
        return new Promise((resolve, reject) => {
            this._client.get(key, function (err, res) {
                err ? reject(err) : resolve(JSON.parse(res))
            })
        })
    }


    // 删除Redis
    delRedis(key) {
        this._client.del(key, function (err) {
            if (err) {
                throw Error(`{delRedis：${err}}`)
            } else {
                return 1
            }
        })
    }

}



module.exports=Redis
