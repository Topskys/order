/*
* 微信用户模型
*/
const mongoose = require('mongoose');



const schema =new mongoose.Schema({
    nickName: {
        type: String,
        default: ''
    },// 昵称
    avatarUrl: {
        type: String,
        default: ''
    },// 头像
    phone: {
        type: String,
        default: ''
    },
    gender: {
        type: String,
        default: '0'
    },
    balance: {
        type: String,
        default: '0'
    },// 余额
    integral: {
        type: String,
        default: '0'
    },// 积分
    discounts: {
        type: Array,
        default: []
    },// 优惠劵
    email: {
        type: String,
        default: ''
    },
    status: {
        type: String,
        default: ''
    },// 状态
    createTime: {
        type: String,
        default: `${new Date().getFullYear()}-${new Date().getMonth()}-${new Date().getDate()}`
    },
    updateTime: {
        type: String,
        default: `${new Date().getFullYear()}-${new Date().getMonth()}-${new Date().getDate()}`
    }
})



const Users = mongoose.model('users', schema)



module.exports = Users
