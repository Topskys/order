// 服务评论
const mongoose = require('mongoose')


const schema = new mongoose.Schema({
    product_id: {
        type: String,
        require: true
    },
    user_id: {
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
    content: {
        type: String,
        default: "",
    },
    service: {
        type: String,
        default: '',
    },
    status: {
        type: Boolean,
        default: true,
    }
}, {
    timestamps: true
})


module.exports = mongoose.model('comments', schema)
