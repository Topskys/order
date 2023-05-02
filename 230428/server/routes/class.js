const router =require('koa-router')()
const {create,del,edit,getById,getAll}=require("../controller/class")

router.prefix("/class")


router.post("/", create)

router.delete("/:id", del)

router.put("/:id", edit)

router.get("/:id", getById)

router.get("/", getAll)


module.exports = router