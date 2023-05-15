const config = {
    host: "127.0.0.1",	//	redis地址
    port: 6379, // 端口号
    legacyMode: true //redis@v4必须
}


module.exports = {
    EXPIRE: 7 * 24 * 60 * 60, // 7 days
    CONFIG: config
}