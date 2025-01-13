// features/payments/composables/payment-form.ts
import { RentalStatus } from '@/features/rentals/interfaces/IRental'
import { RentalDataSourceImpl } from '@/features/rentals/services/datasource'
import { format } from 'date-fns'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'

import { PaymentDatasourceImpl } from '../services/datasource'

export const usePaymentForm = (rentalId: number) => {
  const isLoading = ref(false)
  const selectedType = ref('Efectivo')
  const router = useRouter()
  const toast = useToast()

  const handlePayment = async (amount: number) => {
    isLoading.value = true
    try {
      // Crear el pago
      await PaymentDatasourceImpl.getInstance().create({
        amount,
        paymentDate: format(new Date(), 'dd/MM/yyyy:HH:mm') as unknown as Date,
        status: 'Completado',
        type: selectedType.value,
        rentalId: rentalId,
      })

      // Si es el pago final (segundo pago), actualizar el estado del rental
      const rental = await RentalDataSourceImpl.getInstance().getById(rentalId)
      if (rental.payments.length === 1) {
        // Si tenía un pago previo, este es el segundo
        await RentalDataSourceImpl.getInstance().update(rentalId, {
          status: RentalStatus.PAID,
        })
      }

      toast.success('Pago procesado correctamente')
      router.push({ name: 'rentals' })
    } catch {
      toast.error('Error al procesar el pago')
      // console.error('Error:', error)
    } finally {
      isLoading.value = false
    }
  }

  return {
    isLoading,
    selectedType,
    handlePayment,
  }
}
