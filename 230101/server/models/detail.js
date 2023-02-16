/*
* 房间详情模型
*/
const mongoose = require('mongoose');
const dtf = require('../util/dateTimeFormat');


const schema =new mongoose.Schema({
    roomId: {
        type: String,
        default: ''
    },
    slides: {
        type: Array,
        default: ''
    },
    feature:{
        type:String,
        default: ''
    },
    explain: {
        type: Array,
        default: []
    },
    status: {
        type: String,
        default: ''
    },
    createTime: {
        type: String,
        default:  dtf(Date.now(),"YYYY-MM-DD hh:mm:ss")
    },
    updateTime: {
        type: String,
        default: dtf(Date.now(),"YYYY-MM-DD hh:mm:ss")
    },
})



const Detail = mongoose.model('detail', schema)



module.exports = Detail
