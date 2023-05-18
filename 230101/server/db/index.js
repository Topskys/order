/*
 * 数据库连接模块
 */
const mongoose=require('mongoose');

const url = 'mongodb://localhost:27017/230101'

module.exports =()=>{
    mongoose.connect(url,
        {useNewUrlParser:true,useUnifiedTopology:true}
    ).then(()=>{
        console.log('数据连接成功.')
    }).catch(err=>{
        console.error('数据连接失败',err)
    })
}
