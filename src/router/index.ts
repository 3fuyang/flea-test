import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'login',
    component: () => import('@/components/login/LoginForm.vue')
  }
]

export default createRouter({
  history: createWebHistory(),
  routes: routes
})