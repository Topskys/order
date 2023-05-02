const router = require('koa-router')()
const { getAll, remove} = require("../controller/image.js")

router.prefix('/image')

router.delete('/', remove)

router.get('/', getAll)


module.exports = router
