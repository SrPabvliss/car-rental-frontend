import { useAuthStore } from '@/features/auth/context/auth-store'
import type { IFilter } from '@/shared/interfaces/IFilter'
import { ref, watch, onMounted } from 'vue'

import type { IRental } from '../interfaces/IRental'
import { RentalDataSourceImpl } from '../services/datasource'

export function useRentals() {
  const loading = ref(false)
  const rentals = ref<IRental[]>([])
  const totalItems = ref(0)

  const { getUser } = useAuthStore()
  const user = getUser()

  const filters = ref<IFilter>({
    page: 0,
    perPage: 10,
  })

  const fetchRentals = async () => {
    loading.value = true
    try {
      const result = await RentalDataSourceImpl.getInstance().getByUserId(
        user!.userId,
        filters.value,
      )

      rentals.value = result.items
      totalItems.value = result.totalItems
      filters.value.page = result.page
      filters.value.perPage = result.perPage
    } catch (error) {
      console.error('Error fetching rentals:', error)
      rentals.value = []
      totalItems.value = 0
    } finally {
      loading.value = false
    }
  }

  onMounted(() => {
    fetchRentals()
  })

  watch(
    () => filters.value,
    async (newFilters, oldFilters) => {
      if (JSON.stringify(newFilters) !== JSON.stringify(oldFilters)) {
        await fetchRentals()
      }
    },
    { deep: true },
  )

  return {
    loading,
    filters,
    rentals,
    totalItems,
    fetchRentals,
  }
}
