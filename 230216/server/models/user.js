// 客户端用户模型

const mongoose = require('mongoose');


const schema = new mongoose.Schema({
        username: {
            type: String,
             required: true
        },
        password: {
            type: String,
             required: true
        },
        nickname: {
            type: String,
            default: ''
        },
        avatarUrl: {
            type: String,
            default: ''
        },
        phone: {
            type: String,
            default: ''
        },
        gender: {
            type: String,
            default: '0'
        },
        code: {
            type: String,
            default: '',
        },
        status: {
            type: Boolean,
            default: true
        },
    },
    {
        timestamps: true
    }
)


const Users = mongoose.model('users', schema)


module.exports = Users
