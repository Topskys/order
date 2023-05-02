// 客服，聊天数据操作模型
const mongoose = require('mongoose')


const schema = new mongoose.Schema({
    userId: {
        type: String,
        require: true
    },
    nickName: {
        type: String,
        default: ''
    },
    phone: {
        type: Number,
        default: null
    },
    avatarUrl: {
        type: String,
        default: ''
    },
    content: {
        type: Array,
        default: []
    },
    role: {
        type: String,
        default: "customer",
    },
    status: {
        type: String,
        default: "normal",
    }
}, {
    timestamps: true
})


module.exports = mongoose.model('chat', schema)
