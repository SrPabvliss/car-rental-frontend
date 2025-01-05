import { useAuthStore } from '@/features/auth/context/auth-store'
import { ROLE_ENUM } from '@/features/users/constants/RoleEnum'
import router from '@/router'
import type { IFilter } from '@/shared/interfaces/IFilter'
import { ref, watch, onMounted, computed } from 'vue'

import { RentalStatus, type IRental } from '../interfaces/IRental'
import { RentalDataSourceImpl } from '../services/datasource'

export function useRentals() {
  const loading = ref(false)
  const rentals = ref<IRental[]>([])
  const totalItems = ref(0)
  const selectedRentalId = ref<number | null>(null)
  const isDetailOpen = ref(false)
  const isCancelDialogOpen = ref(false)
  const rentalToCancel = ref<number | null>(null)
  const cancelLoading = ref(false)

  const { getUser } = useAuthStore()
  const user = getUser()

  // Computed properties para roles
  const isEmployee = computed(() => user?.role === ROLE_ENUM.EMPLOYEE)
  const isClient = computed(() => user?.role === ROLE_ENUM.CLIENT)

  // Inicializa selectedClient basado en el rol
  const selectedClient = ref<number | undefined>(
    isClient.value ? user?.userId : 2,
  )

  const filters = ref<IFilter>({
    page: 0,
    perPage: 6,
  })

  const fetchRentals = async () => {
    if (!selectedClient.value) return

    loading.value = true
    try {
      const result = await RentalDataSourceImpl.getInstance().getByUserId(
        selectedClient.value,
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

  watch(
    () => selectedClient.value,
    () => {
      filters.value.page = 0
      fetchRentals()
    },
  )

  onMounted(() => {
    if (isClient.value && user) {
      selectedClient.value = user.userId
    }
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

  const handleClientChange = (clientId: number) => {
    if (!isClient.value) {
      selectedClient.value = clientId
    }
  }

  const handleRentalAction = {
    view: (id: number) => {
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
    },
    processReturn: (id: number) => {
      router.push({ name: 'rental-return', params: { id: id.toString() } })
    },
  }

  const handleFiltersUpdate = (newFilters: any) => {
    filters.value = newFilters
  }

  const handleCancelConfirm = async () => {
    if (!rentalToCancel.value) return

    cancelLoading.value = true
    try {
      await RentalDataSourceImpl.getInstance().update(rentalToCancel.value, {
        status: RentalStatus.CANCELED,
      })
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
    selectedClient,
    fetchRentals,
    handleRentalAction,
    handleFiltersUpdate,
    selectedRentalId,
    isDetailOpen,
    isCancelDialogOpen,
    cancelLoading,
    handleCancelConfirm,
    handleCancelDialog,
    handleClientChange,
    isEmployee,
    isClient,
  }
}
