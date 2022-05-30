import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'login',
    component: () => import('@/components/login/LoginForm.vue')
  },
  {
    path: '/home',
    name: 'home',
    component: () => import('@/components//home/Home.vue')
  },
  {
    path: '/detail/:gid',
    name: 'detail',
    component: () => import('@/components/detail/Detail.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes: routes
})

export default router