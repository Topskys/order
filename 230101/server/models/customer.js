/*
* 顾客模型
*/
const mongoose = require('mongoose');



const schema =new mongoose.Schema({
    username: String,
    avatarUrl: {
        type: String,
        default: ''
    },
    gender: {
        type: String,
        default: ''
    },
    desc: {
        type: String,
        default: ''
    },
    phone: {
        type: String,
        default: ''
    },
    email: {
        type: String,
        default: ''
    }
})



const Customers = mongoose.model('customers', schema)



module.exports = Customers
