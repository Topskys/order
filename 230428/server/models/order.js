// 订单数据操作模型
const mongoose = require('mongoose')


const schema = new mongoose.Schema({
    userId: {
        type: String,
        require: true
    },
    productId: {
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
    title: {
        type: String,
        default: ''
    },
    poster: {
        type: String,
        default: ''
    },
    price: {
        type: String,
        default: "",
    },
    discount: {
        type: String,
        default: ''
    },
    actual_pay: {
        type: String,
        require:true
    },
    payType: {
        type: String,
        default: '微信支付'
    },
    work_date: {
        type: String,
        default: "",
    },
    remark: {
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
