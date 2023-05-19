// 订单数据库操作模型
const mongoose = require('mongoose')


module.exports = mongoose.model('orders', new mongoose.Schema({
    phone: { // 用户电话
        type: String,
        default: ''
    },
    user_id: {
        type: String,
        require: true
    },
    product_id: {
        type: String,
        require: true
    },
    employee_name: { // 
        type: String,
        default: ''
    },
    poster: { // 商品海报
        type: String,
        default: ''
    },
    origin_price: { // 优惠前的价格
        type: String,
        default: ''
    },
    actual_price: { // 实际支付，优惠后支付的价格
        type: String,
        default: '0'
    },
    discount: { // 优惠劵金额
        type: String,
        default: '0',
    },
    service: { // 选择的服务
        type: String,
        require: true,
    },
    work_time: { // 预约上门时间
        type: String,
        default: new Date().toLocaleDateString(),
    },
    remark: { // 备注
        type: String,
        default: ''
    },
    pay_type: { // 支付方式
        type: String,
        default: '微信'
    },
    address: { // 服务地址
        type: String,
        require: true
    },
    status: {
        type: String,
        default: "待支付",
    }
}, {
    timestamps: true
}))
