import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: () =>
        import('@/features/auth/presentation/views/login-view.vue'),
    },
    {
      path: '/register',
      name: 'register',
      component: () =>
        import('@/features/auth/presentation/views/register-view.vue'),
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
  ],
})

export default router
