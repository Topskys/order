const router = require('koa-router')()
const {userSpeak, serverSpeak, getChatById} = require("../controller/chat")

router.prefix("/chat")


router.post("/user", userSpeak)

router.post("/server", serverSpeak)

router.get("/:id", getChatById)


module.exports = router