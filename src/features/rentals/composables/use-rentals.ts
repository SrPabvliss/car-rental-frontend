import { useAuthStore } from '@/features/auth/context/auth-store'
import type { IFilter } from '@/shared/interfaces/IFilter'
import { ref, watch, onMounted } from 'vue'

import { RentalStatus, type IRental } from '../interfaces/IRental'
import { RentalDataSourceImpl } from '../services/datasource'
import router from '@/router'

export function useRentals() {
  const loading = ref(false)
  const rentals = ref<IRental[]>([])
  const totalItems = ref(0)
  const selectedRentalId = ref<number|null>(null)
  const isDetailOpen = ref(false)
  const isCancelDialogOpen = ref(false)
  const rentalToCancel = ref<number | null>(null)
  const cancelLoading = ref(false)



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

  const handleRentalAction = {
    view: (id: number) => {
      console.log("View Action")
      selectedRentalId.value = id
      isDetailOpen.value = true

    },
    edit: (id: number) => {
      router.push({ name: 'rental-edit', params: { id: id.toString() } })
    },
    delete: (id: number) => {
      console.log('Delete rental:', id)
    },
    cancel: (id: number) => {
      rentalToCancel.value = id
      isCancelDialogOpen.value = true
    },
    pay: (id: number) => {
      router.push({ name: 'rental-pay', params: { id: id.toString() } })
    },
    downloadInvoice: (id: number) => {
      console.log('Download invoice:', id)
      // Lógica para descargar factura
    },
    processReturn: (id: number) => {
      console.log('Process return:', id)
      // Lógica para procesar devolución
    }
  }

  const handleFiltersUpdate = (newFilters: any) => {
    // updateFilters(newFilters)
    filters.value = newFilters
  }


  const handleCancelConfirm = async () => {
    if (!rentalToCancel.value) return

    cancelLoading.value = true
    try {
      await RentalDataSourceImpl.getInstance().update(
        rentalToCancel.value,
        {
          status: RentalStatus.CANCELED
        }
      )
      await fetchRentals()
    } catch (error) {
      console.error('Error canceling rental:', error)
    } finally {
      cancelLoading.value = false
      isCancelDialogOpen.value = false
      rentalToCancel.value = null
    }
  }

  const handleCancelDialog = () => {
    isCancelDialogOpen.value = false
    rentalToCancel.value = null
  }

  return {
    loading,
    filters,
    rentals,
    totalItems,
    fetchRentals,
    handleRentalAction,
    handleFiltersUpdate,
    selectedRentalId,
    isDetailOpen,
    isCancelDialogOpen,
    cancelLoading,
    handleCancelConfirm,
    handleCancelDialog
  }
}
