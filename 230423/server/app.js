const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const MongoConnect = require("./db")
const cors = require('koa-cors')
const jwt = require('koa-jwt')
const {SECRET, UNLESS} = require('./controller/config/jwt.js')
const routes = require('./routes')


// database connection
MongoConnect()

// error handler
onerror(app)


// use middlewares
app.use(bodyparser({enableTypes: ['json', 'form', 'text']}))
app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))
app.use(views(__dirname + '/views', {extension: 'pug'}))
app.use(cors())
app.use(jwt({
    secret: SECRET
}).unless({
    path: UNLESS
}))


// logger
app.use(async (ctx, next) => {
    const start = new Date()
    await next()
    const ms = new Date() - start
    console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})


// use routes
app.use(routes.routes(), routes.allowedMethods())


// error-handling
app.on('error', (err, ctx) => {
    console.error('server error', err, ctx)
});


module.exports = app
