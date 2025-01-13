import { useAuthStore } from '@/features/auth/context/auth-store'
import type { ICar } from '@/features/vehicles/interfaces/ICar'
import { CarDataSourceImpl } from '@/features/vehicles/services/datasource'
import router from '@/router'
import { ref, onMounted } from 'vue'
import { useToast } from 'vue-toastification'
import { z } from 'zod'

import { useTempRentalStore } from '../context/temp-rental-store'

export default function useRentalForm(carId: number) {
  const isLoading = ref(false)
  const car = ref<ICar | null>(null)
  const { getUser } = useAuthStore()
  const user = getUser()
  const days = ref(0)

  // use-rental-form.ts
const schema = z.object({
  startDate: z
    .date({ 
      required_error: 'La fecha de inicio es requerida',
      invalid_type_error: 'Fecha de inicio inválida'
    })
    .min(new Date(), { message: 'La fecha de inicio no puede ser anterior a hoy' }),

  endDate: z
    .date({ 
      required_error: 'La fecha de fin es requerida',
      invalid_type_error: 'Fecha de fin inválida'
    })
    .min(new Date(), { message: 'La fecha de fin no puede ser anterior a hoy' })
})
.refine(
  (data) => {
    const start = new Date(data.startDate)
    const end = new Date(data.endDate)
    return end > start
  },
  {
    message: 'La fecha de fin debe ser posterior a la fecha de inicio',
    path: ['endDate']
  }
)
.refine(
  (data) => {
    const start = new Date(data.startDate)
    const maxDate = new Date()
    maxDate.setMonth(maxDate.getMonth() + 6)
    return start <= maxDate
  },
  {
    message: 'No se pueden hacer reservas con más de 6 meses de anticipación',
    path: ['startDate']
  }
)
.refine(
  (data) => {
    const start = new Date(data.startDate)
    const end = new Date(data.endDate)
    const diffTime = end.getTime() - start.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays <= 30
  },
  {
    message: 'El período de alquiler no puede exceder los 30 días',
    path: ['endDate']
  }
)
  const loadCar = async () => {
    isLoading.value = true
    try {
      const result = await CarDataSourceImpl.getInstance().getById(carId)
      car.value = result
    } catch {
      useToast().error('Error al cargar la información del vehículo')
    } finally {
      isLoading.value = false
    }
  }

  // const formatDateForAPI = (date: Date): string => {
  //   return format(date, 'dd/MM/yyyy:HH:mm')
  // }

  const calculateDays = (startDate: Date, endDate: Date): number => {
    const start = new Date(startDate)
    const end = new Date(endDate)
    return Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24))
  }

  const calculateTotal = (startDate: Date, endDate: Date): number => {
    if (!car.value) return 0

    days.value = calculateDays(startDate, endDate)
    return days.value * car.value.dailyRate
  }

  const onSubmit = async (formData: any) => {
    isLoading.value = true
    try {
      if (!user || !car.value) {
        throw new Error('Información incompleta')
      }
      const total = calculateTotal(formData.startDate, formData.endDate)

      // En lugar de crear el rental, guardamos los datos temporalmente
      const tempRentalStore = useTempRentalStore()
      tempRentalStore.setRentalData({
        startDate: formData.startDate,
        endDate: formData.endDate,
        carId: car.value.id,
        total,
      })

      // Redirigir a una nueva ruta para el pago inicial
      router.push({ name: 'rental-initial-payment' })
    } catch (e) {
      console.error('Error:', e)
      useToast().error('Error al procesar la solicitud')
    } finally {
      isLoading.value = false
    }
  }
  onMounted(() => {
    loadCar()
  })

  return {
    car,
    schema,
    onSubmit,
    isLoading,
    calculateTotal,
    days,
  }
}
