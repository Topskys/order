const router = require('koa-router')();
const cart=require('../controller/cart');


router.prefix('/carts')



// 添加购物车
router.post('/',cart.add)


// 删除购物车商品
router.delete('/:id',cart.del)


// 修改购物车(入住、退房操作等)
router.put('/',cart.update)


// 查询购物车1
router.get('/',cart.findAll)



// 查询购物车2
router.get('/:id',cart.findById)



// 支付订单
router.post('/pay',cart.pay)


module.exports = router


