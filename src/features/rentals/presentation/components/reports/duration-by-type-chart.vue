// features/rentals/presentation/components/reports/duration-by-type-chart.vue

<script setup lang="ts">
import { LineChart } from '@/components/ui/chart-line'
import { ref, onMounted } from 'vue'
import type { IDurationByType } from '../../../interfaces/IReports'
import LoadingSpinner from '@/shared/components/loading-spinner.vue'
import { RentalDataSourceImpl } from '@/features/rentals/services/datasource'

const data = ref<IDurationByType[]>([])
const isLoading = ref(true)
const error = ref<string | null>(null)

const loadData = async () => {
  try {
    const response = await RentalDataSourceImpl.getInstance().getAverageDurationByType()
    data.value = response
  } catch {
    error.value = 'Error al cargar los datos de duración'
  } finally {
    isLoading.value = false
  }
}

onMounted(() => {
  loadData()
})
</script>

<template>
  <div class="w-full h-full">
    <div v-if="isLoading" class="h-full flex items-center justify-center">
      <LoadingSpinner />
    </div>

    <div v-else-if="error" class="h-full flex items-center justify-center text-destructive">
      {{ error }}
    </div>

    <div 
      v-else-if="!data.length" 
      class="h-full flex items-center justify-center text-muted-foreground"
    >
      No hay datos suficientes para el análisis de duración
    </div>

    <LineChart
      v-else
      :data="data"
      index="carType"
      :categories="['averageDurationDays', 'shortestRental', 'longestRental']"
      :y-formatter="(tick) => `${tick} días`"
    />
  </div>
</template>