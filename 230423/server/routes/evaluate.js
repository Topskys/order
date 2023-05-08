const router = require('koa-router')()
const {addEvaluate,getEvaluateById, getAll} = require("../controller/evaluate")

router.prefix('/evaluate')


router.post('/:id', addEvaluate)

router.get('/:id', getEvaluateById)

router.get('/', getAll)


module.exports = router
