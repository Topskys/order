const router = require('koa-router')()
const {addOrDel, getAll,getById} = require("../controller/favorite")

router.prefix('/like')


router.put('/:id', addOrDel)

router.get('/', getAll)

router.get('/:id', getById)


module.exports = router
