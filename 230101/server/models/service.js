/*
* 服务模型
*/
const mongoose = require('mongoose');
const dtf = require('../util/dateTimeFormat')


const schema =new mongoose.Schema({
    userId: {
        type: String,
        default: ''
    },// 用户_id
    nickName: {
        type: String,
        default: ''
    },// 昵称
    phone: {
        type: String,
        default: ''
    },// 手机号
    room_number:{
        type: String,
        default: ''// 房间号
    },
    order: {
        type: String,
        default: ''
    },// 预约(时间)
    status: {
        type: String,
        default: 'normal' // normal: 正常(default) ; clear : 清洁(danger) ； clearing：清洁中（warning）；cleared：清洁完成（success）;
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



const Service = mongoose.model('service', schema)



module.exports = Service
