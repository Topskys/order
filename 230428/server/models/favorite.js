// 用户关注商品
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
        default:''
    },
    phone: {
        type: String,
        default:''
    },
    title: {
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
        type: String,
        default: "0",
    },
    status: {
        type: Boolean,
        default: true,
    }
}, {
    timestamps: true
})


module.exports = mongoose.model('favorites', schema)
