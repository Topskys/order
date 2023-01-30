/**
 * 数据面板模型
 */
const  mongoose=require('mongoose');
const dtf =require('../util/dateTimeFormat');



const schema =new mongoose.Schema({
    occupancy:{
        type: Number,
        default: 0
    }, // 住房率
    charge:{
        type: Number,
        default: 0
    }, // 日充值
    comment:{
        type: Number,
        default: 0
    }, // 好评率
    visitor:{
        type: Number,
        default: 0
    }, // 访问量
    hot:{
        type: Array,
        default: []
    }, // 畅销产品
    sale:{
        type: Array,
        default: []
    }, // 月销售额
    status: {
        type: String,
        default: ''
    },
    createTime: {
        type: String,
        default: dtf(Date.now(),"YYYY-MM-DD hh:mm:ss")
    },
    updateTime: {
        type:String,
        default: dtf(Date.now(),"YYYY-MM-DD hh:mm:ss")
    },
})



const Chart = mongoose.model('chart', schema)



module.exports = Chart
