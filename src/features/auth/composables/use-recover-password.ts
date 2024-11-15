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
      .email({ message: 'El email no es válido.' }),
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
