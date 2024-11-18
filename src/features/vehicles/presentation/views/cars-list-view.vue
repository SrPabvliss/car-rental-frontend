<script setup lang="ts">
import ContentLayout from '@/core/layout/content-layout.vue'

import Button from '@/components/ui/button/Button.vue'

import { useCars } from '../../composables/use-cars'
import CarBreadcrumbs from '../components/car-breadcrumb.vue'
import CarPagination from '../components/car-pagination.vue'
import CarsGrid from '../components/cars-grid.vue'
import CarFilters from '../components/filters/car-filters.vue'

const {
  loading,
  filters,
  cars,
  totalItems,
  handleViewCar,
  handleEditCar,
  handleDeleteCar,
  handleChangeCarStatus,
  handleCreateCar,
} = useCars()
</script>

<template>
  <ContentLayout title="Vehículos">
    <template #content>
      <div class="space-y-6">
        <div class="flex items-center justify-between">
          <CarBreadcrumbs
            :items="[{ label: 'Vehículos', href: 'cars', current: true }]"
          />
          <div class="flex justify-end">
            <Button @click="handleCreateCar">Crear vehículo</Button>
          </div>
        </div>

        <CarFilters v-model="filters" />

        <CarsGrid
          :cars="cars"
          :loading="loading"
          @view="handleViewCar"
          @edit="handleEditCar"
          @delete="handleDeleteCar"
          @changeStatus="handleChangeCarStatus"
        />
        <div v-if="totalItems">
          <CarPagination v-model="filters" :total-items="totalItems" />
        </div>
      </div>
    </template>
  </ContentLayout>
</template>
