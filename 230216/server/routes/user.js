const router = require('koa-router')()
const User  =require("../controller/user")


const {login,register,getCode,getAll}= new User()

router.prefix('/users')





router.post('/login', login)


router.post('/register', register)


router.post('/code', getCode)




module.exports = router
