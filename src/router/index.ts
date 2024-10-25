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
  ],
})

export default router
