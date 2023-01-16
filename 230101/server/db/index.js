/*
 * 数据库连接模块
 */
const mongoose=require('mongoose');



module.exports =()=>{
    mongoose.connect('mongodb://localhost:27017/230101',
        {useNewUrlParser:true,useUnifiedTopology:true}
    ).then(()=>{
        console.log('数据连接成功.')
    }).catch(err=>{
        console.error('数据连接失败',err)
    })
}
