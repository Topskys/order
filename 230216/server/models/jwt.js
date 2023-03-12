// 客户端jwt模型

const mongoose = require('mongoose');


const schema = new mongoose.Schema({
        userId: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        token: {
            type: String,
            default: ''
        },
        status: {
            type: String,
            default: 'normal' // normal: 正常(success) ; delete : 删除(danger)  ; info (info)
        },// 状态
    },
    {
        timestamps: true
    }
)


const jwt = mongoose.model('jwt', schema)


module.exports = jwt
