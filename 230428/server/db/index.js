// Database connection module
const mongoose = require('mongoose');



module.exports =()=>{
    mongoose.connect('mongodb://localhost:27017/230428',
        {useNewUrlParser:true,useUnifiedTopology:true}
    ).then(()=>{
        console.log(new Date().toLocaleString(),'Mongoose is Connected')
    }).catch(err=>{
        console.error('Mongoose Error: ',err)
    })
}
