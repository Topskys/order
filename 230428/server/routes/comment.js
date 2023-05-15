const router = require('koa-router')()
const { getAll,create,getById,delById} = require("../controller/comment")

router.prefix('/comment')



router.post('/', create)

router.delete('/:id', delById)

router.get('/:id', getById)

router.get('/', getAll)


module.exports = router
