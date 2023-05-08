// 连接数据库模块
const mongoose = require('mongoose');


function connect() {
    return mongoose.connect(
        require("../controller/config/db.js").URL,
        {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }
    ).then(() => {
        console.log(new Date().toLocaleString(), '数据库连接成功')
    }).catch(err => {
        console.error('数据库连接错误', err)
    })
}


module.exports = connect()
