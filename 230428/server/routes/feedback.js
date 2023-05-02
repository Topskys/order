const router = require('koa-router')()
const {create, remove, getAll} = require("../controller/feedback.js")

router.prefix('/feedback')


router.post("/", create)

router.delete("/:id", remove)

router.get("/", getAll)


module.exports = router