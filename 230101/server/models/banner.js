/*
* 微信用户模型
*/
const mongoose = require('mongoose');



const schema =new mongoose.Schema({
    title: {
        type: String,
        default: ''
    },
    imgUrl: {
        type: String,
        default: ''
    },
    url:{
        type: String,
        default: ''
    },
    status: {
        type: String,
        default: ''
    },
    createTime: {
        type: String,
        default: `${new Date().getFullYear()}-${new Date().getMonth()}-${new Date().getDate()}`
    },
    updateTime: {
        type: String,
        default: `${new Date().getFullYear()}-${new Date().getMonth()}-${new Date().getDate()}`
    }
})



const Banners = mongoose.model('banners', schema)



module.exports = Banners
