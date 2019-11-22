import Vue from 'vue'
import App from './App.vue'
import './plugins/element.js'
import router from './routers'
import axios from 'axios'

axios.defaults.withCredentials = true // 让ajax携带cookie
Vue.config.productionTip = false
Vue.prototype.$axios = axios

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
