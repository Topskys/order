// 用户反馈模型

const mongoose = require('mongoose');


const schema = new mongoose.Schema({
        userId: {
            type: String,
            required: true
        },
        contact: {
            type: String,
            required: true
        },
        status: {
            type: String,
            default: 'normal' // normal: 正常(success) ; delete : 删除(danger)  ; info (info) exception
        },
    },
    {
        timestamps: true
    }
)




module.exports = mongoose.model('feedback', schema)
