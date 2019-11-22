import request from '@/utils/request'
import qs from 'qs'
const scope = 'server'

export const loginByUsername = (username, password, code, randomStr) => {
  const grant_type = 'password'
  return request({
    url: '/auth/oauth/token',
    headers: {
      isToken: false,
      Authorization: 'Basic ZWxpbms6ZWxpbmsxMjM0'
    },
    method: 'post',
    params: { username, password, randomStr, code, grant_type, scope }
  })
}

export const refreshToken = refresh_token => {
  const grant_type = 'refresh_token'
  return request({
    url: '/auth/oauth/token',
    headers: {
      isToken: false,
      Authorization: 'Basic ZWxpbms6ZWxpbmsxMjM0'
    },
    method: 'post',
    params: { refresh_token, grant_type, scope }
  })
}

export const getUserInfo = () => {
  return request({
    url: '/sys/users/detail',
    method: 'get'
  })
}

export const logout = () => {
  return request({
    url: '/auth/token/logout',
    method: 'delete'
  })
}

export const getAuthCode = () => {
  return request({
    url: '/oauth/authorize',
    method: 'post',
    data: {
      client_id: 'elink',
      redirect_uri: 'http://192.168.0.108:3000/getToken',
      response_type: 'code',
      state: 'ndJfFi'
    }
  })
}

//  请求后端Spring安全框架内部的login接口
//  后端根据login重定向到 /oauth/authorize 获取到code
//  最后将 /oauth/authorize 接口的参数的redirect_uri 和 code 拼接返回前端
//  根据返回的地址请求token 返回响应的资源
export const getLogin = user => {
  return request({
    url: '/login',
    headers: {
      'content-type': 'application/x-www-form-urlencoded'
    },
    method: 'post',
    data: qs.stringify(user)
  })
}

export const getToken = params => {
  return request({
    url: 'http://192.168.0.124:8888/auth/oauth/token',
    headers: {
      Authorization: 'Basic ZWxpbms6ZWxpbmsxMjM0'
    },
    method: 'post',
    params: params
  })
}
