const router = require('koa-router')()
const { createCtt,delCtt,getUserMsg,getAll } = require("../controller/contact")


router.prefix("/contact")


router.post("/", createCtt) 

router.delete("/:id", delCtt)

router.get("/:id", getUserMsg)

router.get("/", getAll)


module.exports = router