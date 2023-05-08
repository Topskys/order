const router = require('koa-router')()
const {  getAll, create,del} = require("../controller/favorite")

router.prefix('/favorite')



router.post('/', create)

router.delete('/:id', del)

router.get('/', getAll)


module.exports = router
