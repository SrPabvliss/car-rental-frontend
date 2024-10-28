<script setup lang="ts">
import ContentLayout from '@/core/layout/content-layout.vue'
import CarFilters from '../components/filters/car-filters.vue'
import CarsGrid from '../components/cars-grid.vue'
import CarPagination from '../components/car-pagination.vue'
import CarBreadcrumbs from '../components/car-breadcrumb.vue'
import { useCars } from '../../composables/use-cars'

const {
  loading,
  filters,
  paginatedCars,
  totalFilteredItems,
  handleViewCar,
  handleRentCar,
} = useCars()
</script>

<template>
  <ContentLayout title="Vehículos">
    <template #content>
      <div class="space-y-6">
        <CarBreadcrumbs
          :items="[{ label: 'Vehículos', href: 'cars', current: true }]"
        />

        <CarFilters v-model="filters" />

        <CarsGrid
          :cars="paginatedCars"
          :loading="loading"
          @view="handleViewCar"
          @rent="handleRentCar"
        />

        <CarPagination v-model="filters" :total-items="totalFilteredItems" />
      </div>
    </template>
  </ContentLayout>
</template>
