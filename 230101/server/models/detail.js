/*
* 房间详情模型
*/
const mongoose = require('mongoose');



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
    description: {
        type: Array,
        default: []
    },
    comments:{
        type: Array,
        default: []
    },
    status: {
        type: String,
        default: ''
    },
    createTime: {
        type: String,
        default: `${new Date().getFullYear()}-${new Date().getMonth()+1}-${new Date().getDate()}`
    },
    updateTime: {
        type: String,
        default: `${new Date().getFullYear()}-${new Date().getMonth()+1}-${new Date().getDate()}`
    },
})



const Detail = mongoose.model('rooms_details', schema)



module.exports = Detail
