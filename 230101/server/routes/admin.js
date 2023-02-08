const router = require('koa-router')()
const admin =require('../controller/admin')


router.prefix('/admins')



// 管理员登录
router.post('/login',admin.login)


// 验证登录
router.post('/verify',admin.verify)


// 管理员注册
router.post('/reg',admin.register)


// 更新管理员的信息
router.put('/',admin.update)






module.exports = router
