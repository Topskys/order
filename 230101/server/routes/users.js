const router = require('koa-router')()
const user =require('../controller/user')


router.prefix('/users')

// 前台路由

// 微信用户登录
router.post('/login',user.login)


// 验证登录
router.post('/verify',user.verify)





// 后台路由

// 查询所有微信用户
router.get('/',user.findAll)


// 更新用户信息
router.post('/update',user.update)





module.exports = router
