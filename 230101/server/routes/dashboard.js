const router = require('koa-router')();
const {query} =require('../controller/dashboard');

router.prefix('/dashboard')



router.get('/',query)





module.exports = router
