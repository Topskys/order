const router = require('koa-router')()
const user =require('../controller/user')


router.prefix('/users')



// 微信用户登录
router.post('/login',user.login)


// 验证登录
router.post('/verify',user.verify)






// 查询所有微信用户
router.get('/',user.findAll)


// 更新用户信息
router.put('/',user.update)





module.exports = router
