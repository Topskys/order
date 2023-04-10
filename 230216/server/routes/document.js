const router = require('koa-router')()
const { getAll, create, edit, remove} = require("../controller/document")

router.prefix('/docs')


router.post('/', create)

router.put('/:id', edit)

router.delete('/:id', remove)

router.get('/', getAll)


module.exports = router
