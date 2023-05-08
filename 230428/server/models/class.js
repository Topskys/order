// 类别模型
const mongoose = require('mongoose');


const schema = new mongoose.Schema({
        name: { // 类名
            type: String,
            required: true
        },
        poster: { // 海报
            type: String,
            default: ''
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


const Classes = mongoose.model('classes', schema)


module.exports = Classes
