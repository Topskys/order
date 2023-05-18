const router = require('koa-router')()
const { getAll, create, edit, remove, getList, getById } = require("../controller/discount")

router.prefix('/disc')



router.post('/', create)

router.put('/:id', edit)

router.delete('/:id', remove)

router.get('/wx', getList)

router.get('/', getAll)

router.get('/:id', getById)


module.exports = router
