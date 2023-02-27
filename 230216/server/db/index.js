// 连接数据库模块
const mongoose=require('mongoose');



module.exports =()=>{
    mongoose.connect('mongodb://localhost:27017/230216',
        {useNewUrlParser:true,useUnifiedTopology:true}
    ).then(()=>{
        console.log('数据连接成功.')
    }).catch(err=>{
        console.error('数据连接失败',err)
    })
}
