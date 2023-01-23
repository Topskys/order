const mongoose = require('mongoose');
const dtf = require('../util/dateTimeFormat')



const schema =new mongoose.Schema({
    title: String,
    imgUrl: {
        type: String,
        default: ''
    },
    isDel: {
        type: String,
        default: ''
    },
    desc: {
        type: String,
        default: ''
    },
    price: {
        type: String,
        default: ''
    },
    prevPrice: {
        type: String,
        default: ''
    },
    isFree: {
        type: Boolean,
        default: true
    },
    // sale: {
    //     type: Number,
    //     default: 0
    // },// 销售量

    status: {
        type: String,
        default: ''
    },
    createTime: {
        type: String,
        default: dtf(Date.now,"YYYY-MM-DD hh:mm:ss")
    },
    updateTime: {
        type: String,
        default: dtf(Date.now,"YYYY-MM-DD hh:mm:ss")
    },
})



const Rooms = mongoose.model('rooms', schema)



module.exports = Rooms
