const router = require('koa-router')()
const {getAll, create, edit, del, getById} = require("../controller/order")

router.prefix('/order')


router.post('/', create)

router.put('/:id', edit)

router.delete('/:id', del)

router.get('/:id', getById)

router.get('/', getAll)


module.exports = router
