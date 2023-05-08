const router = require('koa-router')()
const {addProduct, delProduct, updateProduct, getAll,getProductById} = require("../controller/product")

router.prefix('/product')


router.post('/', addProduct)

router.put('/:id', updateProduct)

router.delete('/:id', delProduct)

router.get('/:id',getProductById)

router.get('/', getAll)


module.exports = router
