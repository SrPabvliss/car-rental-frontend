import { getChangedFields } from '@/lib/composables/use-get-changed-fields'
import router from '@/router'
import { ref } from 'vue'
import { useToast } from 'vue-toastification'
import { z } from 'zod'

import type { ICar, ICreateCar, IUpdateCar } from '../interfaces/ICar'
import { CarDataSourceImpl } from '../services/datasource'
import { CAR_STATUSES, CAR_TYPES } from '../constants'

export default function useCarForm(car?: ICar | null) {
  const isLoading = ref(false)
  const imageUrl = ref<string | null>(null)

  if (car) {
    imageUrl.value = car.imageUrl || null
  }

  const schema = z.object({
    brand: z
      .string({ required_error: 'La marca es requerida.' })
      .trim()
      .min(2, { message: 'La marca debe tener al menos 2 caracteres.' })
      .max(50, { message: 'La marca no puede exceder 50 caracteres.' }),
  
    model: z
      .string({ required_error: 'El modelo es requerido.' })
      .trim()
      .min(2, { message: 'El modelo debe tener al menos 2 caracteres.' })
      .max(50, { message: 'El modelo debe tener menos de 50 caracteres.' }),
  
    color: z
      .string({ required_error: 'El color es requerido.' })
      .trim()
      .min(3, { message: 'El color debe tener al menos 3 caracteres.' })
      .max(30, { message: 'El color no puede exceder 30 caracteres.' })
      .regex(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/, { 
        message: 'El color solo puede contener letras.' 
      }),
  
    plate: z
      .string({ required_error: 'La placa es requerida.' })
      .trim()
      .toUpperCase()
      .refine(
        (plate) => {
          const plateRegex = /^[A-Z]{3}-[0-9]{3,4}$/
          return plateRegex.test(plate)
        },
        'La placa debe tener el formato ABC-123 o ABC-1234'
      ),
  
    type: z
      .enum(CAR_TYPES as [string, ...string[]], { 
        required_error: 'El tipo de vehículo es requerido.',
        invalid_type_error: 'Tipo de vehículo no válido.'
      }),
  
    status: z
      .enum(CAR_STATUSES as [string, ...string[]], {
        required_error: 'El estado es requerido.',
        invalid_type_error: 'Estado no válido.'
      })
      .default('Disponible'),
  
    year: z
      .number({ 
        required_error: 'El año es requerido.',
        invalid_type_error: 'El año debe ser un número.' 
      })
      .int({ message: 'El año debe ser un número entero.' })
      .min(2000, { message: 'El año debe ser 2000 o posterior.' })
      .max(new Date().getFullYear(), {
        message: 'El año no puede ser mayor al actual.'
      }),
  
    mileage: z
      .number({ 
        required_error: 'El kilometraje es requerido.',
        invalid_type_error: 'El kilometraje debe ser un número.'
      })
      .nonnegative({ message: 'El kilometraje no puede ser negativo.' })
      .max(999999, { message: 'El kilometraje parece ser muy alto.' }),
  
    dailyRate: z
      .number({ 
        required_error: 'La tarifa diaria es requerida.',
        invalid_type_error: 'La tarifa diaria debe ser un número.' 
      })
      .positive({ message: 'La tarifa diaria debe ser mayor a 0.' })
      .max(1000, { message: 'La tarifa diaria parece ser muy alta.' })
      .transform(val => Number(val.toFixed(2))),
  
    imageUrl: z
      .string()
      .url({ message: 'La URL de la imagen no es válida.' })
      .optional()
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

  async function onSubmit(formData: any) {
    isLoading.value = true

    if (car) {
      const changedFields = getChangedFields(car, formData)

      if (
        Object.keys(changedFields).length === 0 &&
        car &&
        imageUrl.value === car.imageUrl
      ) {
        isLoading.value = false
        useToast().error('No se han modificado los campos')
        return
      }

      const result = await CarDataSourceImpl.getInstance().update(car.id, {
        ...changedFields,
        imageUrl: imageUrl.value ?? undefined,
      } as IUpdateCar)

      if (result) {
        useToast().success('Vehículo actualizado correctamente')
        router.push({ name: 'cars' })
      }
    } else {
      const result = await CarDataSourceImpl.getInstance().create({
        ...formData,
        imageUrl: imageUrl.value ?? undefined,
        status: 'Disponible',
      } as ICreateCar)

      if (result) {
        useToast().success('Vehículo creado correctamente')
        router.push({ name: 'cars' })
      }
    }

    isLoading.value = false
  }

  return {
    schema,
    onSubmit,
    isLoading,
    openWidget,
    imageUrl,
  }
}
