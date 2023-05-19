const router = require('koa-router')()
const {addProduct, delProduct, addService,updateProduct,getArr, getAll,getProductById} = require("../controller/product")

router.prefix('/product')


router.post('/', addProduct)

router.put('/:id', updateProduct)

router.put('/service/:id', addService)

router.delete('/:id', delProduct)

router.get('/wx', getArr)

router.get('/:id',getProductById)

router.get('/', getAll)




module.exports = router
