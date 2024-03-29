// 分类数据操作模型
const mongoose = require('mongoose');

module.exports = mongoose.model('categories', new mongoose.Schema({
    title: { // 类名
        type: String,
        required: true
    },
    poster: { // 海报
        type: String,
        default:''
    },
    status: { // 状态
        type: Boolean,
        default: true
    },
},
    {
        timestamps: true
    }
))
