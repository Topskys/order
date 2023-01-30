const router = require('koa-router')()
const admin =require('../controller/admin')


router.prefix('/admins')



// 管理员登录
router.post('/login',admin.login)


// 验证登录
router.post('/verify',admin.verify)


// 管理员注册
router.post('/reg',admin.register)






module.exports = router
