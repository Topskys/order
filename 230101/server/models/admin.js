/*
* 管理员模型
*/
const mongoose = require('mongoose');
const dtf = require('../util/dateTimeFormat')


const schema =new mongoose.Schema({
    username: {
        type: String,
        default: 'admin',
    },// 账户
    password: {
        type: String,
        default: 'admin',
        select: false,// 查询时，不显示密码
    },// 密码
    avatarUrl: {
        type: String,
        default: ''
    },// 头像
    phone: {
        type: String,
        default: ''
    },// 手机号
    gender: {
        type: String,
        default: '0'
    },// 性别
    email: {
        type: String,
        default: ''
    }, // 邮箱
    type:{
        type: String,
        default: 'admin'
    }, // 管理员类型
    last:{
        type: String,
        default: ''
    }, // 上次登录时间
    current:{
        type: String,
        default: ''
    }, // 登录时间
    status: {
        type: String,
        default: 'normal'
    },// 状态
    createTime: {
        type: String,
        default: dtf(Date.now(),"YYYY-MM-DD hh:mm:ss")
    },
    updateTime: {
        type: String,
        default: dtf(Date.now(),"YYYY-MM-DD hh:mm:ss")
    }
})



const Admins = mongoose.model('admins', schema)



module.exports = Admins
