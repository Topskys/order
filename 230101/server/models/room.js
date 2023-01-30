const mongoose = require('mongoose');
const dtf = require('../util/dateTimeFormat')



const schema =new mongoose.Schema({
    title: String,// 标题
    poster: {
        type: String,
        default: ''
    },// 海报
    room_number:{
        type: String,
        default: ''
    },// 房间号
    description: {
        type: String,
        default: ''
    },// 描述
    price: {
        type: String,
        default: ''
    },// 价格
    origin_price: {
        type: String,
        default: ''
    },// 之前的价格
    sale: {
        type: Number,
        default: 0
    },// 销售数量
    status: {
        type: String,
        default: 'normal' // normal: 正常(success) ; delete : 删除(danger)  ; live ：非空闲((warn);
    },// 状态
    createTime: {
        type: String,
        default: dtf(Date.now(),"YYYY-MM-DD hh:mm:ss")
    },
    updateTime: {
        type: String,
        default: dtf(Date.now(),"YYYY-MM-DD hh:mm:ss")
    },
})



const Rooms = mongoose.model('rooms', schema)



module.exports = Rooms
