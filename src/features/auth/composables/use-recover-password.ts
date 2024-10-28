import { z } from 'zod'
import { type IRecoverPasswordRequest } from '../interfaces/IRecoverPassword'
import { AuthDataSourceImpl } from '../services/datasource'
import router from '@/router'

export default function useRecoverPasswordReq() {
  const schema = z.object({
    email: z
      .string({ required_error: 'El email es requerido.' })
      .email({ message: 'El email no es válido.' }),
  })

  async function onSubmit(formData: IRecoverPasswordRequest) {
    try {
      await AuthDataSourceImpl.getInstance().restorePasswordReq(formData.email)

      router.push({ name: 'reset-password', query: { email: formData.email } })
    } catch (error) {
      console.error(error)
    }
  }

  return {
    schema,
    onSubmit,
  }
}
