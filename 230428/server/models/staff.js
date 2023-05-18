// 维修员模型
const mongoose = require('mongoose');


const schema = new mongoose.Schema({
    name: { // 员工名字
        type: String,
        required: true
    },
    gender: { // 性别
        type: String,
        default: "男"
    },
    age: { // 年龄
        type: Number,
        default: 18
    },
    avatarUrl: {
        type: String,
        default: ''
    },
    phone: {
        type: String,
        require:true
    },
    is_allow: { // 从业资格证等
        type: Boolean,
        default: true
    },
    skill: { // 技能
        type: String,
        default: ''
    },
    region: { // 区域
        type: String,
        default: '福州',
    },
    work_year: { // 工作经验
        type: String,
        default: '1',
    },
    is_busy:{ // 是否已经在维修服务中
        type:Boolean,
        default:false
    },
    status: {
        type: String,
        default: '在职',
    },
},
    {
        timestamps: true
    }
)


module.exports = mongoose.model('staffs', schema)
