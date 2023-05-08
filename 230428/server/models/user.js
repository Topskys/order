// User模型
const mongoose = require('mongoose');

const schema = new mongoose.Schema({
        username: { // 账户（邮箱）
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        nickName: { // 昵称
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
        address: { // 地址
            type: String,
            default: '福州市晋安区兴华村8号',
        },
        code: { // 验证码
            type: String,
            default: '',
        },
        discount: { // 福利
            type: Array,
            default: []
        },
        score: { // 积分
            type: Number | String,
            default: 0
        },
        like: { // 关注
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
