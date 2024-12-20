import router from '@/router'
import { ref, watch, onMounted } from 'vue'

import { defaultFilters } from '../constants'
import type { CarStatus, ICar } from '../interfaces/ICar'
import type { ICarFilters } from '../interfaces/ICarFilters'
import { CarDataSourceImpl } from '../services/datasource'

export function useCars() {
  const loading = ref(false)
  const filters = ref<ICarFilters>({
    ...defaultFilters,
    page: 0,
    perPage: 6,
  })
  const cars = ref<ICar[]>([])
  const totalItems = ref(0)

  const isInitialLoad = ref(true)

  const cleanFilters = (rawFilters: ICarFilters): Partial<ICarFilters> => {
    const cleanedFilters: Partial<ICarFilters> = {}
    Object.entries(rawFilters).forEach(([key, value]) => {
      if (value !== '' && value !== 'all' && value !== null) {
        cleanedFilters[key as keyof ICarFilters] = value
      }
    })
    return cleanedFilters
  }

  const fetchCars = async () => {
    loading.value = true
    try {
      const cleaned = cleanFilters(filters.value)
      const result = await CarDataSourceImpl.getInstance().getAll(cleaned)

      if (result.items && Array.isArray(result.items)) {
        cars.value = result.items
        totalItems.value = result.totalItems || 0

        if (
          result.items.length === 0 &&
          !isInitialLoad.value &&
          filters.value.page > 0
        ) {
          console.warn('No hay resultados para esta página.')
          return
        }
      } else {
        cars.value = []
        totalItems.value = 0
      }
    } catch (error) {
      console.error('Error fetching cars:', error)
      cars.value = []
      totalItems.value = 0
    } finally {
      loading.value = false
      isInitialLoad.value = false
    }
  }

  onMounted(() => {
    fetchCars()
  })

  watch(
    () => filters.value,
    async (newFilters, oldFilters) => {
      if (JSON.stringify(newFilters) !== JSON.stringify(oldFilters)) {
        await fetchCars()
      }
    },
    { deep: true },
  )

  const handleRentCar = (id: number) => {
    console.log('Renting car:', id)
  }

  const handleViewCar = (id: number) => {
    console.log('View car:', id)
  }

  const handleEditCar = (id: number) => {
    router.push({ name: 'cars-edit', params: { id } })
  }

  const handleDeleteCar = async (id: number) => {
    await CarDataSourceImpl.getInstance().delete(id)
    fetchCars()
  }

  const handleChangeCarStatus = async (id: number, newStatus: CarStatus) => {
    const result = await CarDataSourceImpl.getInstance().update(id, {
      status: newStatus,
    })
    if (result) fetchCars()
  }

  const handleCreateCar = () => {
    router.push({ name: 'cars-create' })
  }

  return {
    loading,
    filters,
    cars,
    totalItems,
    cleanFilters,
    fetchCars,
    handleViewCar,
    handleRentCar,
    handleEditCar,
    handleDeleteCar,
    handleChangeCarStatus,
    handleCreateCar,
  }
}
