const router = require('koa-router')()
const { getAll, create, pay, del, getById, setWorker,over,servicing } = require("../controller/order")

router.prefix('/order')


router.post('/', create)

router.put('/wx/:id', pay)

router.put('/:id', setWorker)

router.put('/service/:id', servicing)

router.put('/over/:id', over)

router.delete('/:id', del)

router.get('/:id', getById)

router.get('/', getAll)


module.exports = router
