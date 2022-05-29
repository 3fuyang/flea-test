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
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes: routes
})

export default router