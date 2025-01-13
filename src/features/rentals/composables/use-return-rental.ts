// features/rentals/composables/use-return-rental.ts
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'

import { RentalStatus } from '../interfaces/IRental'
import { RentalDataSourceImpl } from '../services/datasource'

export function useReturnRental(rentalId: string | number) {
  const isProcessing = ref(false)
  const toast = useToast()
  const router = useRouter()

  const completeReturn = async () => {
    isProcessing.value = true
    try {
      await RentalDataSourceImpl.getInstance().update(Number(rentalId), {
        status: RentalStatus.COMPLETED,
      })
      toast.success('Devolución procesada exitosamente')
      router.push({ name: 'rentals' })
    } catch (error) {
      toast.error('Error al procesar la devolución')
      console.error('Error completing return:', error)
    } finally {
      isProcessing.value = false
    }
  }

  return {
    isProcessing,
    completeReturn,
  }
}
