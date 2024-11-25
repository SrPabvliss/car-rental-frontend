import { mainRoutes } from '@/core/routes/main-routes'
import { authRoutes } from '@/features/auth/routes/auth-routes'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [...authRoutes, ...mainRoutes],
})

export default router
