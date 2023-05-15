// 留言数据操作模型
const mongoose = require('mongoose');


module.exports = mongoose.model('messages', new mongoose.Schema({
        kind: { // 留言类型
            type: String,
            required: true
        },
        content: { // 内容
            type: String,
            required: true
        },
        user_id: { // 用户表_id
            type: String,
           required: true
        },
        contact_type: { // 联系方式
            type: String,
            required: true
        },
        status: {
            type: Boolean,
            default: true
        },
    },
    {
        timestamps: true
    }
))
