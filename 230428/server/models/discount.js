// 福利红包
const mongoose = require('mongoose')


const schema = new mongoose.Schema({
    user_id: {
        type: String,
        require: true
    },
    title: {
        type: String,
        require: true
    },
    money_size: {
        type: Number,
        default:0,
    },
    expire:{
        type: String,
        default:''
    },
    limit: {
        type: String,
        default:''
    },
    status: {
        type: Boolean,
        default: true,
    }
}, {
    timestamps: true
})


module.exports = mongoose.model('discounts', schema)
