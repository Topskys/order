const router = require('koa-router')()
const { getAll, create, edit, remove,getDocsById} = require("../controller/document")

router.prefix('/docs')


router.post('/', create)

router.put('/:id', edit)

router.delete('/:id', remove)

router.get('/', getAll)

router.get('/cloud', getDocsById)


module.exports = router
