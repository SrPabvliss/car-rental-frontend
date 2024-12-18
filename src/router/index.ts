import { mainRoutes } from '@/core/routes/main-routes'
import { useAuthStore } from '@/features/auth/context/auth-store'
import { authRoutes } from '@/features/auth/routes/auth-routes'
import { rentalRoutes } from '@/features/rentals/routes/rental-routes'
import { carRoutes } from '@/features/vehicles/routes/car-routes'
import { specialRoutes } from '@/shared/routes/special-routes'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    ...mainRoutes,
    ...authRoutes,
    ...carRoutes,
    ...rentalRoutes,
    ...specialRoutes,
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: () => import('../shared/views/not-found-view.vue'),
    },
  ],
})

router.afterEach(to => {
  const { user } = useAuthStore()

  if (to.matched.some(record => record.meta?.roles)) {
    const allowedRoles = to.meta.roles as string[]

    if (!user || !user.role) {
      router.push({ name: 'login' })
      return
    }

    if (!allowedRoles.includes(user?.role)) router.push({ name: 'forbidden' })
  }
})

export default router
