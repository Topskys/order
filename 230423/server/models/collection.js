// 收藏商品数据库操作模型
const mongoose = require('mongoose')


module.exports = mongoose.model('collections', new mongoose.Schema({
    user_id: { // 用户
        type: String,
        require: true
    },
    nickName: { // 用户昵称
        type: String,
        default: ''
    },
    product_id: { // 商品
        type: String,
        require: true
    },
    employee_name: { 
        type: String,
        require: true
    },
    poster: { // 商品海报
        type: String,
        default: ''
    },
    start_price: { // 起售价
        type: String,
        default: ''
    },
    description: { // 商品描述
        type: String,
        default:''
    },
    status: {
        type: Boolean,
        default: true,
    }
}, {
    timestamps: true
}))
