import router from '@/router'
import { ref } from 'vue'
import { useToast } from 'vue-toastification'
import { z } from 'zod'

import type { ICreateCar } from '../interfaces/ICar'
import { CarDataSourceImpl } from '../services/datasource'

export default function useCarForm() {
  const isLoading = ref(false)
  const imageUrl = ref<string | null>(null)

  const schema = z.object({
    brand: z
      .string({ message: 'La marca es requerida.' })
      .min(3, { message: 'La marca es requerida.' }),
    model: z
      .string({ message: 'El modelo es requerido.' })
      .min(3, { message: 'El modelo debe tener más de 3 caracters.' }),
    color: z
      .string({ message: 'El color es requerido.' })
      .min(3, { message: 'El color debe tener más de 3 caracteres ' }),
    plate: z
      .string({ message: 'La placa es requerida.' })
      .min(3, { message: 'La placa debe tener más de 3 caracteres.' }),
    type: z.enum(
      [
        'Económico',
        'Sedán',
        'SUV Compacto',
        'SUV Grande',
        'Lujo',
        'Camioneta',
        'Minivan',
        'Deportivo',
      ],
      { message: 'El tipo de vehículo es requerido.' },
    ),
    status: z.enum(['Disponible', 'Alquilado', 'En mantenimiento'], {
      message: 'El estado es requerido.',
    }),
    year: z
      .number({ message: 'El año es requerido.' })
      .min(2000, { message: 'El año debe ser 2000 o posterior.' })
      .max(new Date().getFullYear(), {
        message: 'El año no puede superar el actual.',
      }),
    mileage: z
      .number({ message: 'El kilometraje es requerido.' })
      .nonnegative({ message: 'El kilometraje no puede ser negativo.' }),
    dailyRate: z
      .number({ message: 'La tarifa diaria es requerida.' })
      .positive({ message: 'La tarifa diaria debe ser mayor a 0.' }),
    imageUrl: z.string().optional(),
  })

  const openWidget = () => {
    isLoading.value = true
    const widget = (window as any).cloudinary.createUploadWidget(
      {
        cloudName: 'dfiylloik',
        uploadPreset: 'car-rental-preset',
        folder: 'car-rental',
      },
      (error: any, result: any) => {
        if (!error && result && result.event === 'success') {
          imageUrl.value = result.info.secure_url
        }
      },
    )
    isLoading.value = false
    widget.open()
  }

  async function onSubmit(formData: ICreateCar) {
    if (isLoading.value) return

    const toast = useToast()
    isLoading.value = true
    try {
      formData.imageUrl = imageUrl.value ? imageUrl.value : undefined
      const result = await CarDataSourceImpl.getInstance().create(formData)
      toast.success('Vehículo creado exitosamente')
      if (result) {
        router.push({ name: 'cars' })
      }
    } catch {
      toast.error('Error al crear el vehículo')
    } finally {
      isLoading.value = false
    }
  }

  return {
    schema,
    onSubmit,
    isLoading,
    openWidget,
    imageUrl,
  }
}
