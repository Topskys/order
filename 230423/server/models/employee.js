// 服务人员数据操作模型
const mongoose = require('mongoose');


module.exports = mongoose.model('employees', new mongoose.Schema({
    id: { // 工号
        type: String,
        default: ''
    },
    name: { // 名称
        type: String,
        required: true
    },
    age: { // 年龄
        type: Number,
    },
    gender: { // 性别
        type: String,
        default: "男"
    },
    phone: {
        type: String,
        require: true
    },
    address: { // 地址
        type: String,
        default: '福建省福州市仓山区函数路89号',
    },
    skill: { // 技能，文字描述
        type: String,
        require: true,
    },
    experience: { // 工作经验
        type: String,
        require:true
    },
    category: { // 类别
        type: String,
        required: true
    },
    status: {
        type: Boolean,
        default: true
    },
},
    {
        timestamps: true
    }
))
