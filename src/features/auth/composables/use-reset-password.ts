import router from '@/router'
import { ref } from 'vue'
import { z } from 'zod'

import { type IResetPassword } from '../interfaces/IRecoverPassword'
import { AuthDataSourceImpl } from '../services/datasource'

export default function useResetPassword() {
  const isLoading = ref(false)

  const schema: z.ZodSchema = z
    .object({
      token: z.string({ required_error: 'El token es requerido.' }).min(3, {
        message: 'El token debe tener al menos 3 caracteres.',
      }),
      newPassword: z
        .string({ required_error: 'La contraseña es requerida.' })
        .min(3, { message: 'La contraseña debe tener al menos 3 caracteres.' }),
      confirmPassword: z
        .string({
          required_error: 'La confirmación de contraseña es requerida.',
        })
        .min(3, {
          message:
            'La confirmación de contraseña debe tener al menos 3 caracteres.',
        }),
    })
    .refine(data => data.newPassword === data.confirmPassword, {
      message: 'Las contraseñas no coinciden.',
      path: ['confirmPassword'],
    })

  async function onSubmit(formData: IResetPassword) {
    if (isLoading.value) return

    isLoading.value = true
    try {
      await AuthDataSourceImpl.getInstance().resetPassword(formData)
      router.push({ name: 'login' })
    } catch (error) {
      console.error(error)
    } finally {
      isLoading.value = false
    }
  }

  return {
    schema,
    onSubmit,
    isLoading,
  }
}
