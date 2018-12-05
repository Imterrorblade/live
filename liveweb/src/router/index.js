import Vue from 'vue'
import Router from 'vue-router'
import HomeCom from '@/views/home'
import menus from '@/config/menus.js'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: '首页',
      component: HomeCom,
      children: menus,
      redirect: '/live'
    }
  ]
})
