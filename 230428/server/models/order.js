// 订单数据操作模型
const mongoose = require('mongoose')


const schema = new mongoose.Schema({
    user_id: {
        type: String,
        require: true
    },
    product_id: {
        type: String,
        default: true
    },
    nickName: {
        type: String,
        default: ''
    },
    phone: {
        type: String,
        default: ''
    },
    address: {
        type: String,
        require:true
    },
    title: { // 商品标题
        type: String,
        default: ''
    },
    poster: { // 商品海报
        type: String,
        default: ''
    },
    price: { // 价格
        type: String,
        default: "",
    },
    discount: { // 优惠金额
        type: String,
        default: ''
    },
    actual_pay: { // 实付款
        type: String,
        require:true
    },
    pay_type: { // 支付方式
        type: String,
        default: '微信支付'
    },
    work_date: { // 预约时间
        type: String,
        default: "",
    },
    remark: { // 备注
        type: String,
        default: "",
    },
    status: {
        type: String,
        default: "待付款",
    }
}, {
    timestamps: true
})


module.exports = mongoose.model('orders', schema)
