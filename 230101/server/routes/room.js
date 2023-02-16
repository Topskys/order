const router = require('koa-router')();
const room=require('../controller/room')

// 路由前缀
router.prefix('/rooms')



// 查询所有房间（前台）
router.get('/', room.queryAll)


// 分页查询所有房间（后台）
router.get('/all', room.findAll)



// 新增房间
router.post('/add',room.add)


// 删除房间
router.delete('/del/:id',room.del)


// 删除房间
router.put('/:id',room.update)







module.exports = router
