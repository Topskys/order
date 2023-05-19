const router = require('koa-router')()
const { getAll, create, del, getById } = require("../controller/collection")

router.prefix('/favorite')



router.post('/', create)

router.delete('/:id', del)

router.get('/', getAll)

router.get('/:id', getById)


module.exports = router
