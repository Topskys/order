const router = require('koa-router')()
const {login, register, getCode, verify, getAll, logout, create, edit, remove} = require("../controller/user")

router.prefix('/user')


router.post('/login', login)

router.post('/register', register)

router.post('/code', getCode)

router.get('/verify', verify)

router.get('/logout', logout)

router.post('/', create)

router.put('/:id', edit)

router.delete('/:id', remove)

router.get('/', getAll)


module.exports = router
