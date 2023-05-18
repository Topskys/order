
const router = require('koa-router')()
const { create,del,update,getAll,getById,addSer,updateSer,delSer,getSerById } = require("../controller/product")

router.prefix('/product')

router.post('/', create)

router.put('/:id', update)

router.delete('/:id', del)

router.get('/:id', getById)

router.get('/', getAll)


router.post('/service/:id', addSer)

router.put("/service/:id", updateSer)

router.delete('/service/:id', delSer)

router.get('/service/:id', getSerById)



module.exports = router
