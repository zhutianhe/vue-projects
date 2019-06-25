import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Member from '@/components/member/Member'
import ShopCart from '@/components/shopcart/ShopCart'
import Search from '@/components/search/Search'
import NewsList from '@/components/news/NewsList'
import NewsDetail from '@/components/news/NewsDetail'
import PhotoList from '@/components/photos/PhotoList'
import PhotoDetail from '@/components/photos/PhotoDetail'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/member',
      name: 'Member',
      component: Member
    },
    {
      path: '/shopcart',
      name: 'ShopCart',
      component: ShopCart
    },
    {
      path: '/search',
      name: 'Search',
      component: Search
    },
    {
      path: '/news/list',
      name: 'NewsList',
      component: NewsList
    },
    {
      path: '/news/detail/:id',
      name: 'NewsDetail',
      component: NewsDetail
    },
    {
      path: '/photo/list',
      name: 'PhotoList',
      component: PhotoList
    },
    {
      path: '/photo/detail/:id',
      name: 'PhotoDetail',
      component: PhotoDetail
    }
  ]
})
