const router = require('koa-router')();
const chart=require('../controller/chart');


router.prefix('/chart');




// 查询数据面板数据
router.get('/',chart.query)




module.exports = router


