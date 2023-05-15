// 福利红包
const mongoose = require('mongoose')


const schema = new mongoose.Schema({
    title: { // 标题
        type: String,
        require: true
    },
    money_size: { // 金额大小
        type: String,
        require: true
    },
    count: { // 数量
        type: Number,
        require: true
    },
    expire:{ // 逾期时间
        type: String,
        default:''
    },
    limit: { // 限制
        type: String,
        default:''
    },
    status: {
        type: Boolean,
        default: true,
    }
}, {
    timestamps: true
})


module.exports = mongoose.model('discounts', schema)
