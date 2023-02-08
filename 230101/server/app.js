const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')

// 中间件
const MongoConnect = require('./db')
const cors = require('koa-cors')
const koajwt = require('koa-jwt')

// 引入路由
const index = require('./routes/index')
const users = require('./routes/users')
const room = require('./routes/room')
const detail = require('./routes/detail')
const banner = require('./routes/banner')
const cart = require('./routes/cart')
const discount = require('./routes/discount')
const admin = require('./routes/admin')
const dashboard = require('./routes/dashboard')
const upload = require('./routes/upload')
const lose = require('./routes/lose')
const service = require('./routes/service')
const comment = require('./routes/comment')


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

// 允许跨域请求
app.use(cors())

app.use(views(__dirname + '/views', {
  extension: 'pug'
}))

// 配置密钥及不被验证接口
app.use(koajwt({
  secret: '2311-server-jwt'
}).unless({
  path: [/^\/users\/login/, /^\/users/,/^\/banners/,/^\/rooms/,/^\/admins\/login/,/^\/admins\/reg/,/^\/admins\/verify/]
}))






// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})




// routes
app.use(index.routes(), index.allowedMethods())
app.use(users.routes(), users.allowedMethods())
app.use(room.routes(), room.allowedMethods())
app.use(detail.routes(), detail.allowedMethods())
app.use(banner.routes(), banner.allowedMethods())
app.use(cart.routes(), cart.allowedMethods())
app.use(discount.routes(), discount.allowedMethods())
app.use(dashboard.routes(), dashboard.allowedMethods())
app.use(admin.routes(), admin.allowedMethods())
app.use(upload.routes(), upload.allowedMethods())
app.use(lose.routes(), lose.allowedMethods())
app.use(service.routes(), service.allowedMethods())
app.use(comment.routes(), comment.allowedMethods())





// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app
