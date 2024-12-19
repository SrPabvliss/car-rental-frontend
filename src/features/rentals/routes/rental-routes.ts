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
      {
        path: 'rentals/:id',
        name: 'rental-edit',
        component: () =>
          import('@/features/rentals/presentation/views/edit-rental-view.vue'),
        meta: {
          layout: 'dashboard',
          roles: ['Cliente'],
        },

      },{
        path: 'rentals/:id/pay',
        name: 'rental-pay',
        component: () =>
          import('@/features/rentals/presentation/views/rental-pay-view.vue'),
        meta: {
          layout: 'dashboard',
          roles: ['Cliente'],
        },
      }
    ],
  },
]
