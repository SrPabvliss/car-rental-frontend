<script setup lang="ts">
import ContentLayout from '@/core/layout/content-layout.vue'
import { ref, computed, watch } from 'vue'
import type { ICarFilters } from '../../interfaces/ICarFilters'
import { defaultFilters } from '../../constants'
import { mockCarsData } from '../../data/car-data'
import { Home } from 'lucide-vue-next'
import CarFilters from '../components/car-filters.vue'
import CarsGrid from '../components/cars-grid.vue'
import CarPagination from '../components/car-pagination.vue'
import CarBreadcrumbs from '../components/car-breadcrumb.vue'

const loading = ref(false)
const filters = ref<ICarFilters>({
  ...defaultFilters,
  perPage: 5,
})

// Filtrar los carros basado en todos los filtros
const filteredCars = computed(() => {
  let result = [...mockCarsData]

  // Filtro de búsqueda
  if (filters.value.search) {
    const search = filters.value.search.toLowerCase()
    result = result.filter(
      car =>
        car.brand.toLowerCase().includes(search) ||
        car.model.toLowerCase().includes(search),
    )
  }

  // Filtro de marca
  if (filters.value.brand) {
    result = result.filter(car => car.brand === filters.value.brand)
  }

  // Filtro de tipo
  if (filters.value.type) {
    result = result.filter(car => car.type === filters.value.type)
  }

  // Filtro de estado
  if (filters.value.status) {
    result = result.filter(car => car.status === filters.value.status)
  }

  // Filtro de año
  if (filters.value.year) {
    result = result.filter(car => car.year === filters.value.year)
  }

  // Filtros de precio
  if (filters.value.minPrice) {
    result = result.filter(
      car => Number(car.dailyRate) >= Number(filters.value.minPrice),
    )
  }
  if (filters.value.maxPrice) {
    result = result.filter(
      car => Number(car.dailyRate) <= Number(filters.value.maxPrice),
    )
  }

  if (filters.value.orderBy) {
    result.sort((a, b) => {
      switch (filters.value.orderBy) {
        case 'price_asc':
          return a.dailyRate - b.dailyRate
        case 'price_desc':
          return b.dailyRate - a.dailyRate
        case 'year_desc':
          return b.year - a.year
        case 'year_asc':
          return a.year - b.year
        default:
          return 0
      }
    })
  }

  return result
})

// Total de items después de filtrar
const totalFilteredItems = computed(() => filteredCars.value.length)

// Aplicar paginación a los resultados filtrados
const paginatedCars = computed(() => {
  const start = (filters.value.page - 1) * filters.value.perPage
  const end = start + filters.value.perPage
  return filteredCars.value.slice(start, end)
})

const handleViewCar = (id: number) => {
  console.log('View car:', id)
}

const handleRentCar = (id: number) => {
  console.log('Rent car:', id)
}

// Simular carga cuando cambian los filtros
watch(
  filters,
  async newFilters => {
    loading.value = true
    try {
      await new Promise(resolve => setTimeout(resolve, 500))
      console.log('Filters updated:', newFilters)
    } finally {
      loading.value = false
    }
  },
  { deep: true },
)
</script>

<template>
  <ContentLayout title="Vehículos">
    <template #content>
      <div class="space-y-6">
        <CarBreadcrumbs
          :items="[
            { label: 'Inicio', href: 'dashboard', icon: Home },
            { label: 'Vehículos', href: 'cars', current: true },
          ]"
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
