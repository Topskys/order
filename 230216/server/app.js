const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const MongoConnect =require("./db")
const cors = require('koa-cors')
const jwt = require('koa-jwt')

// 引入路由
const routes = require('./routes')




// 启动数据库连接
MongoConnect()




// error handler
onerror(app)




// middlewares
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}))

app.use(json())

app.use(logger())

// 访问静态文件路径
app.use(require('koa-static')(__dirname + '/public'))

app.use(views(__dirname + '/views', {
  extension: 'pug'
}))

// 允许跨域请求
app.use(cors())





// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})




// routes
app.use(routes.routes(), routes.allowedMethods())






// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});




module.exports = app
