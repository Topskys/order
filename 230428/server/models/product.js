// 商品数据操作模型
const mongoose = require('mongoose')


const schema = new mongoose.Schema({
    userId: {
        type: String,
        require: true
    },
    classId: {
        type: String,
        default: true
    },
    detailId: {
        type: String,
        require: true
    },
    title: {
        type: String,
        require: true
    },
    label: {
        type: String,
        default: ''
    },
    startPrice: {
        type: String,
        require: true
    },
    poster: {
        type: String,
        require: true
    },
    sale_num: {
        type: String,
        default: "0",
    },
    status: {
        type: String,
        default: "normal",
    }
}, {
    timestamps: true
})


module.exports = mongoose.model('orders', schema)
