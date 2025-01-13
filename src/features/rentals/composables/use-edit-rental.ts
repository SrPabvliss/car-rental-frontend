import { ref } from 'vue'
import { z } from 'zod'
import { useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'
import { differenceInDays } from 'date-fns'
import type { IRental } from '../interfaces/IRental'
import { RentalDataSourceImpl } from '../services/datasource'
import { format } from 'date-fns'

export default function useEditRental(rental: IRental) {
  const isLoading = ref(false)
  const router = useRouter()
  const toast = useToast()

  const schema = z.object({
    startDate: z.date({
      required_error: 'La fecha de inicio es requerida',
    }),
    endDate: z.date({
      required_error: 'La fecha de fin es requerida',
    }),
  })
  .refine(
    (data) => {
      return data.startDate < data.endDate
    },
    {
      message: 'La fecha de fin debe ser posterior a la fecha de inicio',
      path: ['endDate'],
    }
  )


  const calculateDays = (startDate: Date, endDate: Date) => {
    if (!startDate || !endDate) return 0
    return differenceInDays(new Date(endDate), new Date(startDate))
  }

  const calculateTotal = (startDate: Date, endDate: Date) => {
    const days = calculateDays(startDate, endDate)
    return days * rental.car.dailyRate
  }


  const onSubmit = async (formData: any) => {
    isLoading.value = true
    try {
      await RentalDataSourceImpl.getInstance().update(rental.id, {
        startDate: format(formData.startDate, 'dd/MM/yyyy:HH:mm') as unknown as Date,
        endDate: format(formData.endDate, 'dd/MM/yyyy:HH:mm') as unknown as Date,
        total: calculateTotal(formData.startDate, formData.endDate)
      })
      
      toast.success('Alquiler actualizado correctamente')
      router.push({ name: 'rentals' })
    } catch (error) {
      console.error('Error updating rental:', error)
      toast.error('Error al actualizar el alquiler')
    } finally {
      isLoading.value = false
    }
  }

  return {
    schema,
    onSubmit,
    isLoading,
    calculateTotal,
    calculateDays
  }
}