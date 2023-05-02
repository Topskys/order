const router = require('koa-router')()
const {login, register, getInfo, logout, getAll} = require('../controller/admin')


router.prefix("/admin")


router.post("/login", login)

router.post("/register", register)

router.get("/verify", getInfo)

router.get("/logout", logout)

router.get("/", getAll)


module.exports = router
