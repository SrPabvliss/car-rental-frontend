export const carRoutes = [
  {
    path: 'cars',
    name: 'cars',
    component: () =>
      import('@/features/vehicles/presentation/views/cars-list-view.vue'),
  },
  {
    path: 'cars/create',
    name: 'cars-create',
    component: () =>
      import('@/features/vehicles/presentation/views/car-create-view.vue'),
  },
  {
    path: 'cars/:id',
    name: 'cars-edit',
    component: () =>
      import('@/features/vehicles/presentation/views/car-edit-view.vue'),
  },
]
