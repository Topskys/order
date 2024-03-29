const router = require('koa-router')()
const { getAll, getOrderById, delOrder, editOrder,payOrder,createOrder} = require("../controller/order")

router.prefix('/order')


router.post('/', createOrder)

router.put('/wx/:id', editOrder)

router.put('/:id', payOrder)

router.delete('/:id', delOrder)

router.get('/:id',getOrderById)

router.get('/', getAll)


module.exports = router
