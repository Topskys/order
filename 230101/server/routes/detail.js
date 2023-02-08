const router = require('koa-router')();
const detail=require('../controller/detail')


// 路由前缀
router.prefix('/detail')





// 查询房间详情
router.get('/:id',detail.findById)


// 新增房间评论
router.post('/comment/add',detail.addComment)



// 后台路由

// 新增房间详情
router.post('/detail/add',detail.add)


// 新增或更新房间详情（by _id）
router.post('/addOrUpdate',detail.addOrUpdate)










module.exports = router
