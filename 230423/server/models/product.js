// 商品数据库操作模型
const mongoose = require('mongoose')


module.exports = mongoose.model('products', new mongoose.Schema({
    cate_id: { // 分类主键
        type: String,
        require: true
    },
    evaluate_id: { // 评价主键
        type: String,
        default: ''
    },
    title: { // 商品标题
        type: String,
        require: true
    },
    poster: { // 海报
        type: String,
        require: true
    },
    start_price: { // 商品起售价
        type: String,
        default: ''
    },
    sale_count: { // 已售件数
        type: String,
        default: "0",
    },
    services: { // 服务选项
        type: Array,
        default: [] // [{title,price}]
    },
    description: { // （详情）描述
        type: String,
        default: ''
    },
    images: { // 详情图片描述
        type: Array,
        default: [] // ["img1","img2"]
    },
    location: { // 定位，根据位置推荐相应服务
        type: String,
        default: '福州'
    },
    status: {
        type: Boolean,
        default: true,// true:在售 、 false:下架
    }
}, {
    timestamps: true
}))
