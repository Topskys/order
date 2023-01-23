const router = require('koa-router')();
const rd=require('../controller/detail')


// 路由前缀
router.prefix('/room')


// 前台路由

// 分页查询所有房间
// router.get('/findAll', rd.findAll)

// 查询房间详情
router.get('/detail/:id',rd.findById)


// 新增房间评论
router.post('/comment/add',rd.addComment)



// 后台路由

// 新增房间详情
router.post('/detail/add',rd.add)










module.exports = router
