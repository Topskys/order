const router = require('koa-router')()
const banner =require('../controller/banner')


router.prefix('/banners')



// 新增banner
router.post('/add',banner.add)

// 删除banner
router.delete('/',banner.del)

// 更新banner
router.put('/',banner.update)

// 查询banner
router.get('/',banner.find)






module.exports = router
