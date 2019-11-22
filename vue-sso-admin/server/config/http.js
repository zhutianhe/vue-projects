const axios = require('axios')

axios.defaults.timeout = 5000
axios.defaults.baseURL = 'http://192.168.0.124:9010'
axios.defaults.withCredentials = true

// http request 拦截器
axios.interceptors.request.use(
  config => {
    // config.headers.Authorization = 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJvcmdJZCI6MTExNSwidXNlcklkIjoxMDkyLCJsb2dpbk5hbWUiOiJ3YW5neW9uZ2dhbmciLCJpYXQiOjE1NjQ1NTcyOTYsIm5iZiI6MTU2NDU1NzI5Nn0.UFpPjNppdNRCxnsPNo0zC7qZXdrwQrn50z29Zf-9yxw'

    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// http response 拦截器
axios.interceptors.response.use(
)

module.exports = axios
