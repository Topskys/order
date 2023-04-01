const multer = require("koa-multer");
const OSS = require("ali-oss");
const path = require("path");
const fs = require('fs');


let storage = multer.diskStorage({
    // 文件存储位置
    destination: (req, file, cb) => {
        const folder = new Date().toLocaleDateString().split('/').join('')
        const dir = `./public/uploads/${folder}`
        !fs.existsSync(dir) && fs.mkdirSync(dir, {recursive: true}) // 判断目录是否存在，否则创建目录
        cb(null, dir)
    },
    // 格式化文件名称
    filename: (req, file, cb) => {
        const named = file.originalname || `${Date.now()}${path.extname(file.originalname)}`
        cb(null, named)
    }
})
const receiver = multer({storage})


const uploadFile = async (ctx) => {
    let pathUrl = ctx.req.file.path
    pathUrl = pathUrl.replace(/[\\\\]/g, '/').replace('public', '')
    ctx.body = {
        code: 200,
        url: `${ctx.origin}${pathUrl}`,
        msg: 'success'
    }
}


module.exports = {
    receiver,
    uploadFile
}