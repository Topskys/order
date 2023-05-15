
const router = require('koa-router')()
const { create,del,update,getAll,getById } = require("../controller/product")

router.prefix('/product')

router.post('/', create)

router.put('/:id', update)

router.delete('/:id', del)

router.get('/:id', getById)

router.get('/', getAll)


module.exports = router
