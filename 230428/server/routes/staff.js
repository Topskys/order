const router = require('koa-router')()
const {create, del,edit,getAll,getById,getList} = require("../controller/staff")

router.prefix('/staff')


router.post('/', create)

router.put('/:id', edit)

router.get('/', getAll)

router.get('/wx', getList)

router.get('/:id', getById)


module.exports = router
