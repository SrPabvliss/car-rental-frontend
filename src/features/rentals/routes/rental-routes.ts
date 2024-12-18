export const rentalRoutes = [
  {
    path: '/rentals',
    component: () => import('@/core/layout/dashboard-wrapper.vue'),
    children: [
      {
        path: '',
        name: 'rentals',
        component: () =>
          import('@/features/rentals/presentation/views/rental-list-view.vue'),
        meta: {
          layout: 'dashboard',
          roles: ['Administrador', 'Empleado', 'Cliente'],
        },
      },
    ],
  },
]
