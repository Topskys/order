// 分类路由模块
const router = require('koa-router')()
// commonJS规范导入
const { createAct, delAct, updateAct, getActList, getActAll,getDiscount } = require("../controller/activity")

// 路由前缀 like：http://localhost:3000/activity/* --> prefix is '/activity'
router.prefix("/activity")


router.post("/", createAct) // router.method('routerPath',Handler)

router.delete("/:id", delAct)

router.put("/:id", updateAct)

router.get("/wx", getActList)

router.get("/:id", getDiscount)

router.get("/", getActAll)


module.exports = router