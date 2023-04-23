/*
 * @Author: Topskys
 * @Date: 2023-04-10 23:17:23
 * @LastEditTime: 2023-04-22 14:33:44
 * 文档管理数据模型
 */
const mongoose = require('mongoose');


const schema = new mongoose.Schema({
        filename: {
            type: String,
            required: true
        },
        content: {
            type: String,
            default: '',
        },
        size: {
            type: String,
        },
        url: {
            type: String,
            required: true
        },
        userId: {
            type: String,
            require: true
        },
        username: {
            type: String,
            require: true
        },
        phone: {
            type: String,
            default: ''
        },
        status: {
            type: String,
            default: 'normal'
        },
    },
    {
        timestamps: true
    }
)


const Docs = mongoose.model('docs', schema)


module.exports = Docs
