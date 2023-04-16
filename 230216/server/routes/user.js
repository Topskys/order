/*
 * @Author: Topskys
 * @Date: 2023-04-10 23:15:34
 * @LastEditTime: 2023-04-12 22:42:37
 */
const router = require('koa-router')()
const { login, register, getCode, verify, getAll, logout, create, edit, remove } = require("../controller/user")

router.prefix('/users')


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
