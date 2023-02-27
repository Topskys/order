// 客户端用户模型

const mongoose = require('mongoose');

const definition ={
    username: {
        type: String,
    default: ''
    },
    avatarUrl: {
        type: String,
    default: ''
    },
    phone: {
        type: String,
        default: ''
    },
    gender: {
        type: String,
        default: '0'
    },
    email: {
        type: String,
        default: ''
    },
    status: {
        type: String,
        default: 'normal' // normal: 正常(success) ; delete : 删除(danger)  ;
    },// 状态
    timestamp:true
}



const schema =new mongoose.Schema(definition)

const Users = mongoose.model('users', schema)



module.exports = Users
