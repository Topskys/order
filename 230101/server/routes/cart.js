const router = require('koa-router')();
const cart=require('../controller/cart');


router.prefix('/carts')



// 添加购物车
router.post('/',cart.add)


// 删除订单/购物车商品
router.delete('/:id',cart.del)


// 修改购物车(入住、退房操作等)
router.put('/',cart.update)


// 前台查询购物车
router.get('/',cart.queryAll)



// 后台查看所有订单
router.get('/all',cart.findAll)



// 查询购物车by _id
router.get('/:id',cart.findById)



// 支付订单
router.post('/pay',cart.pay)



// 房间清洁
router.put('/clear',cart.clear)


module.exports = router


