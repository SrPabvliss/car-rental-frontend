import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: () =>
        import('@/features/auth/presentation/views/login-view.vue'),
    },
    {
      path: '/test',
      name: 'test',
      component: () => import('@/core/layout/layout-view.vue'),
      children: [
        {
          path: '',
          name: 'module-test',
          component: () => import('@/core/layout/content-test.vue'),
        },
      ],
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: () => import('@/core/layout/layout-view.vue'),
      children: [
        {
          path: 'cars',
          name: 'cars',
          component: () =>
            import('@/features/vehicles/presentation/views/cars-list-view.vue'),
        },
      ],
    },
  ],
})

export default router
