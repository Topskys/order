const router = require('koa-router')()
const lose =require('../controller/lose')


router.prefix('/loses')



// 新增
router.post('/',lose.add)


// 领取
router.post('/:id',lose.received)


// 修改
router.put('/',lose.update)


// 查询所有
router.get('/',lose.findAll)





module.exports = router
