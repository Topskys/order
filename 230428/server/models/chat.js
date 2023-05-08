// 客服，聊天数据操作模型
const mongoose = require('mongoose')


const schema = new mongoose.Schema({
    product_id: {
        type: String,
        default: ''
    },
    user_id: {
        type: String,
        require: true
    },
    admin_id: {
        type: String,
        default: ''
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
        type: String,
        require: true
    },
    read: {
        type: Boolean,
        default: false
    },
    role: {
        type: String,
        default: 'user'
    },
    status: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
})


module.exports = mongoose.model('services', schema)
