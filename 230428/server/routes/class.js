const router =require('koa-router')()
const {create,del,edit,getById,getAll,getList}=require("../controller/class")

router.prefix("/class")


router.post("/", create)

router.delete("/:id", del)

router.put("/:id", edit)

router.get("/:id", getById)

router.get("/", getList)

router.get("/wx", getAll)


module.exports = router