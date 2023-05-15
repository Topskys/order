// 用户关注商品
const mongoose = require('mongoose')


const schema = new mongoose.Schema({
    title: {
        type: String,
        require: true
    },
    description: {
        type: String,
        require: true
    },
    start_price: {
        type: String,
        require: true
    },
    poster: {
        type: String,
        require: true
    },
    sale_num: {
        type: Number,
        default: 0,
    },
    nickName: {
        type: String,
        default: ''
    },
    user_id: {
        type: String,
        require: true
    },
    product_id: {
        type: String,
        default: true
    },
    status: {
        type: Boolean,
        default: true,
    }
}, {
    timestamps: true
})


module.exports = mongoose.model('favorites', schema)
