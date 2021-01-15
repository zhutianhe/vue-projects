import Vue from 'vue'
import App from './App.vue'
import hljs from 'highlight.js';
import ViewUI from 'view-design'
import ElementUI from 'element-ui'
import router from './routes'
import 'view-design/dist/styles/iview.css'
import 'element-ui/lib/theme-chalk/index.css';
import 'highlight.js/styles/atom-one-light.css';

Vue.use(ViewUI)
Vue.use(ElementUI)
Vue.config.productionTip = false

router.afterEach(() => {
  // https://github.com/highlightjs/highlight.js/issues/909#issuecomment-131686186
  Vue.nextTick(() => {
    const blocks = document.querySelectorAll('pre code:not(.hljs)');
    Array.prototype.forEach.call(blocks, hljs.highlightBlock);
  });
});

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
