// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
import Axios from 'axios'
import '../static/css/global.css'
import Installer from '@/plugins/installer'
import MyUl from '@/components/common/MyUl'
import MyLi from '@/components/common/MyLi'
import NavBar from '@/components/common/NavBar'
import Comment from '@/components/common/Comment'
import Moment from 'moment'
import VuePreview from 'vue-preview'

Vue.config.productionTip = false

// 加载组件
Vue.use(MintUI)
Vue.use(Installer) // 加载自己定义的组件
Vue.use(VuePreview)

// 定义全局组件
Vue.component(MyUl.name, MyUl)
Vue.component(MyLi.name, MyLi)
Vue.component(NavBar.name, NavBar)
Vue.component(Comment.name, Comment)

// 定义全局过滤器
Moment.locale('zh-cn')
Vue.filter('convertTime', function (data, formatStr) {
  return Moment(data).format(formatStr)
})
Vue.filter('relTime', function (data) {
  return Moment(data).fromNow()
})

// 原型挂载
Axios.defaults.baseURL = 'http://localhost:3000/api'
Vue.prototype.$axios = Axios

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
