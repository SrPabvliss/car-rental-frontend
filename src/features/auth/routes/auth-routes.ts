export const authRoutes = [
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
    path: '/recover-password',
    name: 'recover-password',
    component: () =>
      import(
        '@/features/auth/presentation/views/recover-password-req-view.vue'
      ),
  },
  {
    path: '/reset-password',
    name: 'reset-password',
    component: () =>
      import('@/features/auth/presentation/views/reset-password-view.vue'),
  },
]
