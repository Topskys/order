// 维修员模型
const mongoose = require('mongoose');


const schema = new mongoose.Schema({
        name: {
            type: String,
            required: true
        },
        gender: {
            type: String,
            required: true,
            default: "男"
        },
        nickName: {
            type: String,
            default: '王师傅'
        },
        avatarUrl: {
            type: String,
            default: ''
        },
        phone: {
            type: String,
            default: ''
        },
        region: {
            type: String,
            default: '福州',
        },
        work_year: {
            type: String,
            default: '1',
        },
        score: {
            type: Number,
            default: '4.8'
        },
        service_num: {
            type: String,
            default: '',
        },
        status: {
            type: String,
            default: '',
        },
    },
    {
        timestamps: true
    }
)


module.exports = mongoose.model('employees', schema)
