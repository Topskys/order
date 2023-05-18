// 订单数据操作模型
const mongoose = require('mongoose')


const schema = new mongoose.Schema({
    nickName: { // 用户昵称
        type: String,
        default: ''
    },
    phone: {
        type: String,
        default: ''
    },
    address: {
        type: String,
        require: true
    },
    title: { // 商品标题
        type: String,
        default: "",
    },
    service: { // 选择的服务
        type: String,
        require: true
    },
    price: { // 选择的服务价格
        type: String,
        default: "",
    },
    poster: { // 商品海报
        type: String,
        require:true
    },
    discount: { // 优惠金额
        type: String,
        default: ''
    },
    actual_pay: { // 实付款
        type: String,
        require: true
    },
    pay_type: { // 支付方式
        type: String,
        default: '微信支付'
    },
    work_date: { // 预约时间
        type: String,
        default: new Date().toLocaleDateString(),
    },
    remark: { // 备注
        type: String,
        default: "",
    },
    pay_token: { // 支付凭证
        type: String,
        default: Buffer.from(Date.now()+'').toString("base64")
    },
    user_id: {
        type: String,
        require: true
    },
    product_id: {
        type: String,
        default: true
    },
    worker_id: { // 维修员_id
        type: String,
        default: ''
    },
    worker: { // 维修师傅
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
