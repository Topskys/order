// 商品评论数据库操作模型
const mongoose = require('mongoose')


module.exports = mongoose.model('evaluations', new mongoose.Schema({
    user_id: { // 用户
        type: String,
        require: true
    },
    product_id: { // 商品
        type: String,
        require: true
    },
    title: { // 商品标题
        type: String,
        require: true
    },
    nickName: { // 用户昵称
        type: String,
        default: ''
    },
    avatarUrl: { // 用户头像
        type: String,
        default: ''
    },
    gender: { // 用户性别
        type: Number,
        default: 0
    },
    content: { // 内容
        type: String,
        require: true,
    },
    status: {
        type: Boolean,
        default: true,
    }
}, {
    timestamps: true
}))
