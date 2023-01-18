const router = require('koa-router')()
const discount=require('../controller/discount')


router.prefix("/discounts")



// 请求优惠劵列表
router.get("/",discount.findAll)


// 领取优惠劵
router.post("/take",discount.take)


// 新增优惠劵
router.post("/add",discount.add)


// 更新优惠劵
router.put("/",discount.update)

// 删除优惠劵
router.delete("/:id",discount.del)



module.exports =router
