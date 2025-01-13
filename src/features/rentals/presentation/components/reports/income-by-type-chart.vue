<script setup lang="ts">
import { BarChart } from '@/components/ui/chart-bar'
import { ref, onMounted, computed } from 'vue'
import type { IIncomeByType } from '../../../interfaces/IReports'
import LoadingSpinner from '@/shared/components/loading-spinner.vue'
import { RentalDataSourceImpl } from '@/features/rentals/services/datasource'

const data = ref<IIncomeByType[]>([])
const isLoading = ref(true)
const error = ref<string | null>(null)

// Función helper para convertir string con coma a número
const parseAmount = (amount: string): number => {
  return Number(amount.replace(',', '.'))
}

// Procesar datos para convertir strings a números
const processedData = computed(() => {
  return data.value.map(item => ({
    carType: item.carType,
    totalIncome: parseAmount(item.totalIncome),
    totalRentals: Number(item.totalRentals),
    averagePerRental: parseAmount(item.averagePerRental)
  }))
})

// Total general para porcentajes
const totalIncome = computed(() => {
  return processedData.value.reduce((sum, item) => sum + item.totalIncome, 0)
})

const loadData = async () => {
  try {
    const response = await RentalDataSourceImpl.getInstance().getTotalIncomeByType()
    data.value = response
  } catch {
    error.value = 'Error al cargar los datos de ingresos'
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
      No hay datos de ingresos disponibles
    </div>

    <div v-else class="h-full flex flex-col">
      <div class="flex-1">
        <BarChart
          :data="processedData"
          index="carType"
          :categories="['totalIncome']"
          :y-formatter="(tick) => {
            return typeof tick === 'number'
              ? `$ ${new Intl.NumberFormat('es-EC', {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2
                }).format(tick)}`
              : ''
          }"
        />
      </div>

      <!-- Resumen detallado -->
      <div class="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div 
          v-for="item in processedData" 
          :key="item.carType"
          class="p-4 rounded-lg border bg-background"
        >
          <h4 class="font-medium mb-2">{{ item.carType }}</h4>
          <div class="space-y-1 text-sm">
            <div class="flex justify-between">
              <span class="text-muted-foreground">Total Ingresos:</span>
              <span class="font-medium">
                $ {{ new Intl.NumberFormat('es-EC', {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2
                }).format(item.totalIncome) }}
              </span>
            </div>
            <div class="flex justify-between">
              <span class="text-muted-foreground">Cantidad Alquileres:</span>
              <span>{{ item.totalRentals }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-muted-foreground">Promedio por Alquiler:</span>
              <span>
                $ {{ new Intl.NumberFormat('es-EC', {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2
                }).format(item.averagePerRental) }}
              </span>
            </div>
            <div class="flex justify-between border-t pt-1 mt-1">
              <span class="text-muted-foreground">% del Total:</span>
              <span class="font-medium">
                {{ ((item.totalIncome / totalIncome) * 100).toFixed(1) }}%
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>