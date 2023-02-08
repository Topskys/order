const multer=require("koa-multer");
const OSS = require("ali-oss");
const path = require("path");
const fs = require('fs');




// 图片上传后存储服务端文件夹（本地）
let storage=multer.diskStorage({
    // 存储文件夹
    destination:(req,file,cb)=>{
        const dir = `public/uploads/`

        // 判断目录是否存在，否则创建目录
        !fs.existsSync(dir) && fs.mkdirSync(dir, {recursive: true})

        cb(null,dir)
    },
    // 格式化文件名
    filename(req, file, cb) {
        // let f_name=file.originalname.split(".")
        // cb(null,`${Date.now()}.${f_name[f_name.length-1]}`) // Date.now() 时间戳 1970-1-1-00:00:00到现在的毫秒数

        cb(null,`${Date.now()}${path.extname(file.originalname)}`)
    }
})

const  upload=multer({storage})




// ali-oss
// const client = new OSS({
//     region: 'oss-cn-shenzhen',
//     // 建议使用子账户
//     accessKeyId: '****',
//     accessKeySecret: '****',
//     bucket: '***'
// })

// 上传file到oss
// const pushOSS =data=>{
//     return new Promise((resolve, reject)=>{
//         client.put('文件夹/',data).then(res=>{
//             // resolve(res)
//             console.log('push ali-oss--',res)
//         }).catch(err=>{
//             // reject(err)
//             console.log('push ali-oss--',err)
//         })
//     })
// }



module.exports={
    upload,
    // pushOSS,
}
