const router = require('koa-router')()
const User  =require("../controller/user")


const {login,register,getCode,verify,getAll}= new User()

router.prefix('/users')





router.post('/login', login)


router.post('/register', register)


router.post('/code', getCode)


router.post('/verify', verify)


router.get('/', getAll)




module.exports = router
