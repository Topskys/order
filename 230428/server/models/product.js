// product模型
const mongoose = require('mongoose')


const schema = new mongoose.Schema({
    title: { // 商品标题
        type: String,
        require: true
    },
    description: { // 描述
        type: String,
        require:true
    },
    poster: { // 海报
        type: String,
        require: true
    },
    start_price: { // 商品起售价
        type: String,
        default: ''
    },
    sale_num: { // 已预约次数
        type: Number,
        default: 0,
    },
    class_id: { // 类别主键
        type: String,
        default: true
    },
    class_name: { // 类别名称
        type: String,
        default: ''
    },
    comment_id: { // 评价主键
        type: String,
        default: ''
    },
    selections: { // 服务数组
        type: Array,
        default: [],
    },
    images: { // 图片描述
        type: Array,
        default: [],
    },
    status: {
        type: Boolean,
        default:true,
    }
}, {
    timestamps: true
})


module.exports = mongoose.model('products', schema)
