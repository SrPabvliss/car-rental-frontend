import { useAuthStore } from '@/features/auth/context/auth-store'
import type { ICar } from '@/features/vehicles/interfaces/ICar'
import { CarDataSourceImpl } from '@/features/vehicles/services/datasource'
import router from '@/router'
import { format } from 'date-fns'
import { ref, onMounted } from 'vue'
import { useToast } from 'vue-toastification'
import { z } from 'zod'

import { RentalStatus, type ICreateRental } from '../interfaces/IRental'
import { RentalDataSourceImpl } from '../services/datasource'

export default function useRentalForm(carId: number) {
  const isLoading = ref(false)
  const car = ref<ICar | null>(null)
  const { getUser } = useAuthStore()
  const user = getUser()
  const days = ref(0)

  const schema = z
    .object({
      startDate: z.instanceof(Date, {
        message: 'La fecha de inicio es requerida',
      }),
      endDate: z.instanceof(Date, { message: 'La fecha de fin es requerida' }),
    })
    .refine(
      data => {
        const start = new Date(data.startDate)
        const end = new Date(data.endDate)
        return end > start
      },
      {
        message: 'La fecha de fin debe ser posterior a la fecha de inicio',
        path: ['endDate'],
      },
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

  const formatDateForAPI = (date: Date): string => {
    return format(date, 'dd/MM/yyyy:HH:mm')
  }

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

      const rentalData: ICreateRental = {
        startDate: formatDateForAPI(formData.startDate) as unknown as Date,
        endDate: formatDateForAPI(formData.endDate) as unknown as Date,
        status: RentalStatus.ACTIVE,
        total,
        carId: car.value.id,
        userId: user.userId,
      }

      const result = await RentalDataSourceImpl.getInstance().create(rentalData)

      if (result) {
        useToast().success('Alquiler creado correctamente')
        router.push({ name: 'rentals' })
      }
    } catch {
      useToast().error('Error al crear el alquiler')
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
