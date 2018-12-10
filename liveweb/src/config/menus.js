export default [{
  path: 'live',
  name: '直播',
  component: () => import('@/views/live/index.vue'),
  children: [{
    path: '',
    name: 'home',
    component: () => import('@/views/live/home.vue')
  }, {
    path: 'live',
    name: 'myLive',
    component: () => import('@/views/live/live.vue')
  }]
}, {
  path: 'chart',
  name: '聊天',
  component: () => import('@/views/chart/index.vue')
}, {
  path: 'friends',
  name: '好友',
  component: () => import('@/views/friends/index.vue')
}, {
  path: 'personal',
  name: '个人中心',
  component: () => import('@/views/personal/index.vue')
}]
