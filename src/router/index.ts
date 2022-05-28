import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'login',
    component: () => import('@/components/login/LoginForm.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes: routes
})

export default router