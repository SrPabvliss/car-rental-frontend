export const adminRoutes = [
  {
    path: '/usuarios',
    component: () => import('@/core/layout/dashboard-wrapper.vue'),
    children: [
      {
        path: '',
        name: 'usuarios',
        component: () => import('@/features/users/views/users-list-view.vue'),
        meta: {
          layout: 'dashboard',
          roles: ['Administrador'],
        },
      },
    ],
  },
]
