const router = require('koa-router')()
const { addEmployee, delEmployee,getList, updateEmpInfo, getEmpList } = require("../controller/employee")

router.prefix('/employee')


router.post('/', addEmployee)

router.put('/:id', updateEmpInfo)

router.delete('/:id', delEmployee)

router.get('/', getEmpList)

router.get('/wx', getList)


module.exports = router
