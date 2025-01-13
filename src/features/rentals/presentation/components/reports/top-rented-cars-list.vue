// features/rentals/presentation/components/reports/top-rented-cars-list.vue

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import type { IMostRentedCars } from '../../../interfaces/IReports'
import LoadingSpinner from '@/shared/components/loading-spinner.vue'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { RentalDataSourceImpl } from '@/features/rentals/services/datasource'

const data = ref<IMostRentedCars[]>([])
const isLoading = ref(true)
const error = ref<string | null>(null)

const loadData = async () => {
  try {
    const response = await RentalDataSourceImpl.getInstance().getMostRentedCars()
    data.value = response
  } catch {
    error.value = 'Error al cargar los vehículos más rentados'
  } finally {
    isLoading.value = false
  }
}

onMounted(() => {
  loadData()
})
</script>

<template>
  <div class="w-full">
    <div v-if="isLoading" class="h-48 flex items-center justify-center">
      <LoadingSpinner />
    </div>

    <div v-else-if="error" class="h-48 flex items-center justify-center text-destructive">
      {{ error }}
    </div>

    <div 
      v-else-if="!data.length" 
      class="h-48 flex items-center justify-center text-muted-foreground"
    >
      No hay datos de alquileres disponibles
    </div>

    <div v-else class="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      <Card v-for="(car, index) in data" :key="index">
        <CardHeader>
          <CardTitle class="flex items-center justify-between">
            {{ car.carBrand }} {{ car.carModel }}
            <span class="text-2xl font-bold">#{{ index + 1 }}</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div class="space-y-2">
            <div class="flex justify-between">
              <span class="text-muted-foreground">Tipo:</span>
              <span>{{ car.carType }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-muted-foreground">Alquileres:</span>
              <span>{{ car.totalRentals }}</span>
            </div>
            <div class="flex justify-between font-bold">
              <span>Ingresos:</span>
              <span>${{ car.revenue }}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  </div>
</template>