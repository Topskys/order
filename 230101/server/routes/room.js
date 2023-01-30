const router = require('koa-router')();
const room=require('../controller/room')


// 路由前缀
router.prefix('/rooms')


// 前台路由

// 分页查询所有房间
router.get('/', room.findAll)

// 查询房间详情
router.get('/:id',room.detail)




// 后台路由

// 新增房间
router.post('/add',room.add)










module.exports = router
