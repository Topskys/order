// 反馈信息模型
const mongoose = require('mongoose');


const schema = new mongoose.Schema({
        subject: {
            type: String,
            required: true
        },
        content: {
            type: String,
            required: true
        },
        contact: {
            type: String,
            required: true
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


module.exports = mongoose.model('feedback', schema)
