import router from '@/router'
import { ref } from 'vue'
import { z } from 'zod'

import { type IRecoverPasswordRequest } from '../interfaces/IRecoverPassword'
import { AuthDataSourceImpl } from '../services/datasource'

export default function useRecoverPasswordReq() {
  const isLoading = ref(false)

  const schema = z.object({
    email: z
      .string({ required_error: 'El email es requerido.' })
      .trim()
      .min(5, { message: 'El email debe tener al menos 5 caracteres.' })
      .max(50, { message: 'El email no puede exceder 50 caracteres.' })
      .email({ message: 'Ingrese un email válido.' })
      .refine(
        (email) => {
          const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
          return emailRegex.test(email)
        }, 
        'El formato del email no es válido.'
      )
  })

  async function onSubmit(formData: IRecoverPasswordRequest) {
    if (isLoading.value) return

    isLoading.value = true
    try {
      await AuthDataSourceImpl.getInstance().restorePasswordReq(formData.email)

      router.push({ name: 'reset-password', query: { email: formData.email } })
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
