// 用户数据操作模型
const mongoose = require('mongoose');


module.exports = mongoose.model('users', new mongoose.Schema({
        username: {
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
        avatarUrl: { // 头像
            type: String,
            default: ''
        },
        phone: {
            type: String,
            default: ''
        },
        email: { // 邮箱
            type: String,
            default: ''
        },
        gender: { // 性别
            type: String,
            default: '男'
        },
        discount_count: { // 优惠劵数量
            type: Number,
            default: 0
        },
        discounts:{ // 存储优惠劵数组
            type:Array,
            default: [],
        },
        address: { // 地址
            type: String,
            default: '福建省福州市仓山区函数路89号',
        },
        status: {
            type: Boolean,
            default: true
        },
    },
    {
        timestamps: true
    }
))
