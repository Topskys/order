const router = require('koa-router')()
const {uploadFile} =require('../controller/upload')
const {upload}=require('.././config/oss')

router.prefix('/upload')


router.post('/',upload.single('file'), uploadFile)





module.exports = router
