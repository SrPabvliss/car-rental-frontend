<script setup lang="ts">
import { DonutChart } from '@/components/ui/chart-donut'
import { ref, onMounted, computed } from 'vue'
import type { IRentalsByType } from '../../../interfaces/IReports'
import LoadingSpinner from '@/shared/components/loading-spinner.vue'
import { RentalDataSourceImpl } from '@/features/rentals/services/datasource'

const data = ref<IRentalsByType[]>([])
const isLoading = ref(true)
const error = ref<string | null>(null)

// Procesamos los datos para asegurar que quantity sea número
const processedData = computed(() => {
  return data.value.map(item => ({
    ...item,
    quantity: Number(item.quantity) // Convertimos el string a número
  }))
})

// Total para el porcentaje
const total = computed(() => {
  return processedData.value.reduce((sum, item) => sum + item.quantity, 0)
})

const loadData = async () => {
  try {
    const response = await RentalDataSourceImpl.getInstance().getCarRentalsByType()
    data.value = response
  } catch {
    error.value = 'Error al cargar los datos del reporte'
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
      No hay datos suficientes para generar el reporte
    </div>

    <div v-else class="h-full flex flex-col">
      <!-- Chart -->
      <div class="flex-1">
        <DonutChart
          index="type"
          :category="'quantity'"
          :data="processedData"
          :value-formatter="(value) => `${value} alquileres`"
        />
      </div>

      <!-- Leyenda personalizada -->
      <div class="mt-4 grid grid-cols-2 md:grid-cols-3 gap-4">
        <div
          v-for="item in processedData"
          :key="item.type"
          class="flex items-center gap-2"
        >
          <div 
            class="w-4 h-4 rounded" 
            :style="{
              backgroundColor: `hsl(${(processedData.indexOf(item) * 360) / processedData.length}, 70%, 50%)`
            }"
          />
          <div class="flex flex-col">
            <span class="text-sm font-medium">{{ item.type }}</span>
            <span class="text-xs text-muted-foreground">
              {{ item.quantity }} alquileres 
              ({{ ((item.quantity / total) * 100).toFixed(1) }}%)
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>