<script setup lang="ts">
import ContentLayout from '@/core/layout/content-layout.vue'
import ConfirmationDialog from '@/shared/components/confirmation-dialog.vue'
import { ref } from 'vue'

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

const dialogVisible = ref(false)
const selectedCarId = ref<number | null>(null)

const openDeleteDialog = (carId: number) => {
  selectedCarId.value = carId
  dialogVisible.value = true
}

const confirmDelete = () => {
  if (selectedCarId.value) {
    handleDeleteCar(selectedCarId.value)
    dialogVisible.value = false
  }
}
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
          @delete="openDeleteDialog"
          @changeStatus="handleChangeCarStatus"
        />

        <ConfirmationDialog
          :visible="dialogVisible"
          title="Eliminar vehículo"
          message="¿Estás seguro de que quieres eliminar este vehículo? Esta acción no se puede deshacer."
          @confirm="confirmDelete"
          @cancel="dialogVisible = false"
        />
        <div v-if="totalItems">
          <CarPagination v-model="filters" :total-items="totalItems" />
        </div>
      </div>
    </template>
  </ContentLayout>
</template>
