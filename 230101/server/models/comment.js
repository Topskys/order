const mongoose = require('mongoose');
const dtf = require('../util/dateTimeFormat')


const schema = new mongoose.Schema({
    content: {
        type: String,
        default: ''
    },// 评论内容
    satisfaction: {
        type: Boolean,
        default: true
    },// 好评
    roomId: {
        type: String,
        default: ''
    }, // 房间_id
    // title: {
    //     type: String,
    //     default: ''
    // },// 房间标题
    room_number: {
        type: String,
        default: ''
    },// 房间号
    userId: {
        type: String,
        default: ''
    },// 用户_id
    nickName: {
        type: String,
        default: ''
    }, // 用户昵称
    status: {
        type: String,
        default: 'normal' // normal: 正常(success) ; delete : 删除(danger)  ;
    },// 状态
    createTime: {
        type: String,
        default: dtf(Date.now(), "YYYY-MM-DD hh:mm:ss")
    },
    updateTime: {
        type: String,
        default: dtf(Date.now(), "YYYY-MM-DD hh:mm:ss")
    },
})


const Comments = mongoose.model('comments', schema)


module.exports = Comments
