const router = require('koa-router')()
const {login,register,getCode,verify,getAll,logout}=require("../controller/user")

router.prefix('/users')


router.post('/login', login)

router.post('/register', register)

router.post('/code', getCode)

router.get('/verify', verify)

router.get('/logout', logout)

router.get('/', getAll)


module.exports = router
