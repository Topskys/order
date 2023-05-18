const router = require('koa-router')()
const service =require('../controller/service')


router.prefix('/service')

// 清洁
router.post('/',service.clear)

// 查询
router.get('/',service.findAll)

// 更新
router.put('/:id',service.update)





module.exports = router
