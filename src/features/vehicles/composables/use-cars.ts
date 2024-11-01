import { ref, computed, watch } from 'vue'

import { defaultFilters } from '../constants'
import { mockCarsData } from '../data/car-data'
import type { ICar } from '../interfaces/ICar'
import type { ICarFilters } from '../interfaces/ICarFilters'

export function useCars() {
  const loading = ref(false)
  const filters = ref<ICarFilters>({
    ...defaultFilters,
  })

  const filteredCars = computed(() => {
    let result = [...mockCarsData]

    if (filters.value.search) {
      const search = filters.value.search.toLowerCase()
      result = result.filter(
        car =>
          car.brand.toLowerCase().includes(search) ||
          car.model.toLowerCase().includes(search),
      )
    }

     
    const applyFilter = (key: keyof ICar, value: any) => {
      if (value) {
        result = result.filter(car => car[key] === value)
      }
    }

    applyFilter('brand', filters.value.brand)
    applyFilter('type', filters.value.type)
    applyFilter('status', filters.value.status)
    applyFilter('year', filters.value.year)

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
      const sortMap = {
        price_asc: (a: ICar, b: ICar) => a.dailyRate - b.dailyRate,
        price_desc: (a: ICar, b: ICar) => b.dailyRate - a.dailyRate,
        year_desc: (a: ICar, b: ICar) => b.year - a.year,
        year_asc: (a: ICar, b: ICar) => a.year - b.year,
      }
      result.sort(sortMap[filters.value.orderBy as keyof typeof sortMap])
    }

    return result
  })

  const totalFilteredItems = computed(() => filteredCars.value.length)

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

  watch(
    filters,
    async () => {
      loading.value = true
      try {
        console.log('Filters changed:', filters)
        await new Promise(resolve => setTimeout(resolve, 500))
      } finally {
        loading.value = false
      }
    },
    { deep: true },
  )

  return {
    loading,
    filters,
    filteredCars,
    totalFilteredItems,
    paginatedCars,
    handleViewCar,
    handleRentCar,
  }
}
