// 用户模型
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
        nickName: {
            type: String,
            default: ''
        },
        avatarUrl: {
            type: String,
            default: ''
        },
        phone: {
            type: String,
            default: '18200001234'
        },
        gender: {
            type: Number,
            default: 0
        },
        city: {
            type: String,
            default: '',
        },
        country: {
            type: String,
            default: '',
        },
        province: {
            type: String,
            default: '',
        },
        address: {
            type: String,
            default: '福州市晋安区兴华村8号',
        },
        code: {
            type: String,
            default: '',
        },
        discount: {
            type: Array,
            default: []
        },
        score: {
            type: Number | String,
            default: 0
        },
        like: {
            type: Number | String,
            default: 0
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
