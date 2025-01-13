export const carRoutes = [
  {
    path: '/cars',
    component: () => import('@/core/layout/dashboard-wrapper.vue'),
    children: [
      {
        path: '',
        name: 'cars',
        component: () =>
          import('@/features/vehicles/presentation/views/cars-list-view.vue'),
        meta: {
          layout: 'dashboard',
          roles: ['Administrador', 'Empleado', 'Cliente'],
        },
      },
      {
        path: 'create',
        name: 'cars-create',
        component: () =>
          import('@/features/vehicles/presentation/views/car-create-view.vue'),
        meta: {
          layout: 'dashboard',
          roles: ['Administrador'],
        },
      },
      {
        path: ':id',
        name: 'cars-edit',
        component: () =>
          import('@/features/vehicles/presentation/views/car-edit-view.vue'),
        meta: {
          layout: 'dashboard',
          roles: ['Administrador'],
        },
      },
      {
        path: ':id/rent',
        name: 'cars-rent',
        component: () =>
          import(
            '@/features/rentals/presentation/views/create-rental-view.vue'
          ),
        meta: {
          layout: 'dashboard',
          roles: ['Cliente'],
        },
      },
    ],
  },
]
