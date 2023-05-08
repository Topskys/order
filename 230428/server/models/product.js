// product模型
const mongoose = require('mongoose')


const schema = new mongoose.Schema({
    class_id: { // 类别主键
        type: String,
        default: true
    },
    detail_id: { // 详情主键
        type: String,
        default:''
    },
    title: { // 商品标题
        type: String,
        require: true
    },
    start_price: { // 商品起售价
        type: String,
        default: ''
    },
    poster: { // 海报
        type: String,
        require: true
    },
    sale_num: { // 已预约次数
        type: String,
        default: "0",
    },
    status: {
        type: Boolean,
        default:true,
    }
}, {
    timestamps: true
})


module.exports = mongoose.model('products', schema)
