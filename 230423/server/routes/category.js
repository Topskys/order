// 分类路由模块
const router = require('koa-router')()
const {createCate, delCate, updateCate, getCateList} = require("../controller/category")

router.prefix("/category")


router.post("/", createCate)

router.delete("/:id", delCate)

router.put("/:id", updateCate)


router.get("/", getCateList)


module.exports = router