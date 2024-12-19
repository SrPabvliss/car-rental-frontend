import { ref } from 'vue'
import { useToast } from 'vue-toastification'
import { useRouter } from 'vue-router'
import { PaymentDatasourceImpl } from '../services/datasource'
import { RentalDataSourceImpl } from '@/features/rentals/services/datasource'
import { format } from 'date-fns'
import { RentalStatus } from '@/features/rentals/interfaces/IRental'


export const usePaymentForm = (rentalId: number) => {
  const isLoading = ref(false)
  const selectedType = ref('Efectivo')
  const router = useRouter()
  const toast = useToast()

  const handlePayment = async (totalAmount: number) => {
    isLoading.value = true
    try {
      // Crear el pago
      await PaymentDatasourceImpl.getInstance().create({
        amount: totalAmount,
        paymentDate: format(new Date(), 'dd/MM/yyyy:HH:mm') as unknown as Date,
        status: 'Completado',
        type: selectedType.value,
        rentalId: rentalId
      })

      await RentalDataSourceImpl.getInstance().update(rentalId, {
        status: RentalStatus.PAID
      })

      toast.success('Pago procesado correctamente')
      router.push({ name: 'rentals' })
    } catch (error) {
      toast.error('Error al procesar el pago')
    } finally {
      isLoading.value = false
    }
  }

  return {
    isLoading,
    selectedType,
    handlePayment
  }
}