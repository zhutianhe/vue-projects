const router = require('koa-router')()
var http = require('../config/http')
const qs = require('qs')

/**
 * 基于前后端分离的SSO流程
 *
 * 1.前端浏览器访问需认证资源 --->
 * 2.前端浏览器验证请求中是否含有token，如果没有 --->
 * 3.前端浏览器请求后端授权服务器，并记录当前访问位置发送给后端 --->
 * 4.后端授权服务器直接重定向到登录页，并渲染到浏览端 --->
 * 5.前端浏览器提交用户名，密码到后端授权服务器 --->
 * 6.后端授权服务器验证成功，自动获取授权码，并重定向至前端服务器 --->
 * 7.前端服务器根据授权码请求认证服务器，获取token --->
 * 8.前端服务器将token存在服务器的session中  （基于session）
 * ---8.1前端服务器的session有效期
 * ---8.2前端服务器的token有效期
 * ---8.3认证服务器的session有效期
 * 9.前端服务器将token存在浏览器的cookie中   （基于token）
 * ---9.1浏览器的cookie/token有效期
 * ---9.2认证服务器的session有效期
 * 10.前端服务器携带token访问微服务资源
 */

// 1. 客户端登录, 前端服务器提交用户名、密码到后端授权服务器
// router.post('/login', async (ctx, next) => {
//   console.log('进入请求')
//   console.log(ctx.request.body)
//   await http({
//     // 后端登录的请求接口
//     url: '/login',
//     method: 'post',
//     data: qs.stringify(ctx.request.body),
//     headers: {
//       'Content-Type': 'application/x-www-form-urlencoded'
//     }
//   }).then(res => {
//     console.log(res)
//   })
//   next()
// })

// // 2. 请求授权码接口
// router.get('/getAuthCode', async (ctx, next) => {
//   console.log('进入请求/getAuthCode')
//   console.log(ctx.query)
//   await http({
//     // 后端获取授权码的请求接口, 获取之后，后端会自动重定向到 redirect_uri?code=授权码&state=认证之前的前端请求页面的标识
//     url: 'http://192.168.0.124:9010/oauth/authorize',
//     mehod: 'get',
//     params: {
//       client_id: 'elink', // 客户端Id, 不能暴露在浏览器中，必须由前端服务器发送
//       redirect_uri: 'http://192.168.0.108:3000/getToken', // 后端重定向到前端服务器，获取token的前端服务器请求
//       response_type: 'code',
//       state: 'ndJfFi' // 认证之前的前端请求页面的标识
//     }
//   }).then(res => {
//     console.log('-------------------------------------------------------------------------------')
//     console.log(res.data)
//     ctx.body = res.data
//     console.log('-------------------------------------------------------------------------------')
//   })
//   next()
// })

// 3. 使用授权码获取认证token
router.get('/getToken', async (ctx, next) => {
  console.log('进入请求')
  console.log(ctx.query)
  await http({
    // 后端获取token的请求接口
    url: 'http://192.168.0.124:8888/auth/oauth/token',
    headers: {
      Authorization: 'Basic ZWxpbms6ZWxpbmsxMjM0'
    },
    method: 'post',
    params: {
      grant_type: 'authorization_code', // 认证类型为授权码模式
      redirect_uri: 'http://192.168.0.108:3000/getToken',
      code: ctx.query.code, // 获取的授权码
      scope: 'server'
    }
  }).then(res => {
    console.log('-------------------------------------------------------------------------------')
    console.log('rural_access_token:' + res.data.access_token)
    console.log('rural_refresh_token:' + res.data.refresh_token)

    ctx.cookies.set('rural_access_token', res.data.access_token, {
      domain: '192.168.0.108',
      path: '/',
      maxAge: res.data.expires_in,
      expires: new Date('2019-11-22'), // cookie失效时间
      httpOnly: false, // 是否只用于http请求中获取
      overwrite: false // 是否允许重写
    })
    ctx.cookies.set('rural_refresh_token', res.data.refresh_token, {
      domain: '192.168.0.108',
      path: '/',
      maxAge: 2592000,
      expires: new Date('2019-11-22'), // cookie失效时间
      httpOnly: false, // 是否只用于http请求中获取
      overwrite: false // 是否允许重写
    })
    ctx.body = '重新跳转到' + ctx.query.state
    console.log('-------------------------------------------------------------------------------')
  })
  next()
})

module.exports = router
