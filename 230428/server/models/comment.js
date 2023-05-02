// 商品详情评论
const mongoose = require('mongoose')


const schema = new mongoose.Schema({
    productId: {
        type: String,
        require: true
    },
    detailId: {
        type: String,
        require: true
    },
    userId: {
        type: String,
        require: true
    },
    nickName: {
        type: String,
        default: "Topsky",
    },
    avatarUrl: {
        type: String,
        default: "",
    },
    phone: {
        type: String,
        default: "",
    },
    star: {
        type: Number,
        default: 0,
        require: true
    },
    star_num: {
        type: Number,
        default: 0,
        require: true
    },
    selections: {
        type: Array,
        default: [],
        require: true
    },
    content: {
        type: String,
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
