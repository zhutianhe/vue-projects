import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

let Router = new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/login',
      name: '登录页',
      component: () => import('@/pages/login/index'),
      meta: {
        keepAlive: true,
        isTab: false,
        isAuth: false
      }
    },
    {
      path: '/loginForm',
      name: '登录表单',
      component: () => import('@/pages/login/userlogin'),
      meta: {
        isAuth: false
      }
    },
    {
      path: '/getToken',
      name: '登录表单',
      component: () => import('@/pages/login/getToken'),
      meta: {
        isAuth: false
      }
    }
  ]
})

export default Router
