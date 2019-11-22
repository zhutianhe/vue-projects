const Koa = require('koa')
const app = new Koa()
const bodyparser = require('koa-bodyparser')
const login = require('./routes/login')

// middlewares
app.use(bodyparser())

// router
app.use(login.routes(), login.allowedMethods())

module.exports = app
