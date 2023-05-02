const router = require('koa-router')()
const {receiver, uploadFile} = require("../controller/upload")


router.post('/upload', receiver.single('file'), uploadFile)


module.exports = router