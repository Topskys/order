/*
* 微信用户模型
*/
const mongoose = require('mongoose');
const dtf = require('../util/dateTimeFormat')


const schema = new mongoose.Schema({
    title: {
        type: String,
        default: ''
    },// 标题
    poster: {
        type: String,
        default: ''
    },// 失物图片
    phone: {
        type: String,
        default: '13100001234'
    },// 手机号
    finder: {
        type: String,
        default: '甘老板'
    },// 联系人
    address: {
        type: String,
        default: '旗山弧警卫处'
    },// 领取地址
    description: {
        type: String,
        default: ''
    },// 描述
    status: {
        type: String,
        default: 'normal' // normal: 正常(success) ; delete : 删除(danger)  ; received : 已领取
    },// 状态
    createTime: {
        type: String,
        default: dtf(Date.now(), "YYYY-MM-DD hh:mm:ss")
    },
    receiver: {
        type: String,
        default: ''
    },// 领取人联系电话
    updateTime: {
        type: String,
        default: dtf(Date.now(), "YYYY-MM-DD hh:mm:ss")
    }
})


const Loses = mongoose.model('loses', schema)


module.exports = Loses
