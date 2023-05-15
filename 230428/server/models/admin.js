/**
 * 管理员数据库模型
 * @type {module:mongoose}
 */
const mongoose = require('mongoose')


const schema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        default: null
    },
    nickname: {
        type: String,
        default: ''
    },
    avatarUrl: {
        type: String,
        default: ''
    },
    gender: {
        type: String,
        default: '男'
    },
    role: {
        type: String,
        default: "admin",
    },
    status: {
        type: Boolean,
        default:true
    }
}, {
    timestamps: true
})


module.exports = mongoose.model('admins', schema)
