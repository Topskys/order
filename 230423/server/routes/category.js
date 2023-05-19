// 分类路由模块
const router = require('koa-router')()
const {createCate, delCate,getAll, updateCate, getCateList} = require("../controller/category")

router.prefix("/category")


router.post("/", createCate)

router.delete("/:id", delCate)

router.put("/:id", updateCate)

router.get("/wx", getCateList) // 主要是小程序调用

router.get("/", getAll)


module.exports = router