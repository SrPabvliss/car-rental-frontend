import { carRoutes } from '@/features/vehicles/routes/car-routes'

export const mainRoutes = [
  {
    path: '/',
    name: 'home',
    redirect: { name: 'login' },
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: () => import('@/core/layout/layout-view.vue'),
    children: [...carRoutes],
  },
]
