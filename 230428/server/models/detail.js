// 商品详情
const mongoose = require('mongoose')


const schema = new mongoose.Schema({
    product_id: {
        type: String,
        require: true
    },
    comment_id: {
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
    start_price: {
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
        require:true
    },
    imgs: {
        type: Array,
        default: [],
        require: true
    },
    status: {
        type: Boolean,
        default: true,
    }
}, {
    timestamps: true
})


module.exports = mongoose.model('details', schema)
