/*
* 微信用户模型
*/
const mongoose = require('mongoose');
const dtf = require('../util/dateTimeFormat')


const schema =new mongoose.Schema({

    title: {
        type: String,
        default: Date.now()
    },// 优惠劵名称
    discount: {
        type: Number,
        default: Math.floor(Math.random() *(10-1)+1)
    },// 优惠劵数额[1,10]
    stock: {
        type: Number,
        default: Math.floor(Math.random() *(10-1)+1)
    },// 数量[1,10]
    limit: {
        type: Number,
        default: Math.floor(Math.random() *(5-1)+1)
    },// 有限期至[1,5]日
    status: {
        type: String,
        default: ''
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



const Discounts = mongoose.model('discounts', schema)



module.exports = Discounts
