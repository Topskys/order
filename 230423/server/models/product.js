// 商品数据库操作模型
const mongoose = require('mongoose')


module.exports = mongoose.model('products', new mongoose.Schema({
    employee_name: { // 家政人员名称
        type: String,
        require: true
    },
    employee_id: { // 家政人员表主键
        type: String,
        require: true
    },
    poster: { // 海报
        type: String,
        require: true
    },
    experience: { // 服务经验
        type: String,
        default: ''
    },
    cate_id: { // 分类主键
        type: String,
        require: true
    },
    cate_title: { // 分类标题
        type: String,
        require: true
    },
    evaluate_id: { // 评价主键
        type: String,
        default: ''
    },
    start_price: { // 起始价
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
    skill: { // 家政人员技能描述
        type: String,
        default: ''
    },
    description: { // 服务描述
        type: String,
        default: ''
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
