const router = require('koa-router')()
const {
    login,
    register,
    removeUser,
    createUser,
    getUserInfo,
    getUsers,
    logout,
    updateUserInfo
} = require("../controller/user")

router.prefix('/user')


router.post('/login', login)

router.post('/register', register)

router.get('/verify', getUserInfo)

router.get('/logout', logout)

router.post('/', createUser)

router.put('/:id', updateUserInfo)

router.delete('/:id', removeUser)

router.get('/', getUsers)


module.exports = router
