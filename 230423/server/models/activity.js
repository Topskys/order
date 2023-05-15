// 活动数据操作模型
const mongoose = require('mongoose');


module.exports = mongoose.model('activities', new mongoose.Schema({
    title: { // 标题
        type: String,
        required: true
    },
    discount: { // 优惠金额 
        type: Number,
        required: true
    },
    end_time: { // 有效期
        type: String,
        required: true
    },
    up_size: { // 满多少钱可用
        type: Number,
        required: true
    },
    count: { // 数量
        type: Number,
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
