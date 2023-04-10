// 文档管理数据模型

const mongoose = require('mongoose');


const schema = new mongoose.Schema({
        filename: {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true
        },
        nickname: {
            type: String,
            default: ''
        },
        username: {
            type: String,
            require:true
        },
        phone: {
            type: String,
            default: ''
        },
        gender: {
            type: String,
            default: '0'
        },
        status: {
            type: Boolean,
            default: true
        },
    },
    {
        timestamps: true
    }
)


const Docs = mongoose.model('docs', schema)


module.exports = Docs
