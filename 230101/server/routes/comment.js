const router = require('koa-router')();
const comment=require('../controller/comment')


// 路由前缀
router.prefix('/comments')



// 新增评论
router.post('/',comment.add)


// 永久删除评论
router.delete('/:id',comment.del)



// 前台查询房间详情的评论
router.get('/:id', comment.queryAll)


// 后台查询所有评论
router.get('/',comment.findAll)






module.exports = router
