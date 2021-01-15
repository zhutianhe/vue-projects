import Vue from 'vue'
import { LoadingBar } from 'view-design'
import Router from 'vue-router'

Vue.use(Router)

const ui = () => import("@/views/ui")
const visual = () => import("@/views/visual")
const custom = () => import("@/views/custom")

const router = new Router({
  mode: 'hash',
  routes: [
    {
      path: '/ui',
      name: 'UI',
      component: ui
    },
    {
      path: '/visual',
      name: 'Visual',
      component: visual
    },
    {
      path: '/custom',
      name: 'Custom',
      component: custom,
      children: [
        {
          path: 'input',
          name: 'CustomInput',
          component: () => import("@/pages/custom/input")
        },
        {
          path: 'cascader',
          name: 'CustomCascader',
          component: () => import("@/pages/custom/cascader")
        },
        {
          path: 'list',
          name: 'CustomList',
          component: () => import("@/pages/custom/list")
        },
        {
          path: 'timedown',
          name: 'CustomTimedown',
          component: () => import("@/pages/custom/timedown")
        },
        {
          path: 'higher-query',
          name: 'CustomHigherQuery',
          component: () => import("@/pages/custom/search")
        }
      ]
    },
  ]
})

router.beforeEach((to, from, next) => {
  LoadingBar.start()
  next()
})

router.afterEach(() => {
  LoadingBar.finish()
})

export default router
