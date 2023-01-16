/**
 * 购物车模型
 */

const mongoose = require('mongoose');




const schema =new mongoose.Schema({
    roomId:{
        type:String,
        default:''
    },
    userId:{
        type:String,
        default:''
    },
    nickName:{
        type:String,
        default:''
    },
    phone:{
        type:String,
        default:''
    },
    number: {
        type: Number,
        default:1
    },
    total: {
        type: Number,
        default:0
    },
    checked: {
        type: Boolean,
        default:false
    },
    clear: {
        type: String,
        default:'0' // 0:不需要清洁; 1: 需要 2：完成清洁
    },
    room:{
        type:Object,
        default: {}
    },
    roomNumber:{
        type:String,
        default: ''
    },
    rentTime:{
        type:Object,
        default: {
            startDate: '',
            endDate: '',
        }
    },
    message: {
        type: String,
        default: ''
    },
    payType:{
        type: String,
        default: '微信支付'
    },
    status: {
        type: String,
        default: '0' // 0：未付款；1：待入住；2：入驻中；3：待评价；4：完成
    },
    createTime: {
        type: String,
        default: `${new Date().getFullYear()}-${new Date().getMonth()+1}-${new Date().getDate()}`
    },
    updateTime: {
        type: String,
        default: `${new Date().getFullYear()}-${new Date().getMonth()+1}-${new Date().getDate()}`
    },
})



const Carts = mongoose.model('carts', schema)



module.exports = Carts
