import Vue from 'vue'
import Router from 'vue-router'
import HomeCom from '@/views/home'
import menus from '@/config/menus.js'

Vue.use(Router)

const router = menus.concat([{
  path: 'login',
  name: 'login',
  component: () => import('@/views/login/index.vue')
}, {
  path: 'register',
  name: 'register',
  component: () => import('@/views/login/register.vue')
}])
export default new Router({
  routes: [
    {
      path: '/',
      name: '首页',
      component: HomeCom,
      children: router,
      redirect: '/live'
    }
  ]
})
