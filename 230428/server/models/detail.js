// 商品详情
const mongoose = require('mongoose')


const schema = new mongoose.Schema({
    productId: {
        type: String,
        require: true
    },
    commentId: {
        type: String,
        default: ''
    },
    poster: {
        type: String,
        require: true
    },
    title: {
        type: String,
        require: true
    },
    sale_num: {
        type: String,
        default: "0",
    },
    startPrice: {
        type: String,
        require: true
    },
    selections: {
        type: Array,
        default: [],
        require: true
    },
    description: {
        type: String,
        default: ''
    },
    imgs: {
        type: Array,
        default: [],
        require: true
    },
    status: {
        type: String,
        default: "normal",
    }
}, {
    timestamps: true
})


module.exports = mongoose.model('details', schema)
