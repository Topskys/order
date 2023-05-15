const router = require('koa-router')()
const {userSpeak, serverSpeak, getChatById,getAll} = require("../controller/chat")

router.prefix("/chat")


router.post("/user", userSpeak)

router.post("/server", serverSpeak)

router.get("/:id", getChatById)

router.get("/", getAll)


module.exports = router