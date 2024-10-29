/* eslint-disable @typescript-eslint/no-explicit-any */
import { z } from 'zod'
import { AuthDataSourceImpl } from '../services/datasource'
import type { IResetPassword } from '../interfaces/IRecoverPassword'
import router from '@/router'

export default function useResetPassword() {
  const schema: any = z.object({
    token: z.string({ required_error: 'El token es requerido.' }),
    newPassword: z
      .string({ required_error: 'La contraseña es requerida.' })
      .min(3, { message: 'La contraseña debe tener al menos 3 caracteres.' }),
    confirmPassword: z
      .string({ required_error: 'La confirmación de contraseña es requerida.' })
      .min(3, {
        message:
          'La confirmación de contraseña debe tener al menos 3 caracteres.',
      })
      .refine(data => data !== schema._def.shape.newPassword, {
        message: 'Las contraseñas no coinciden.',
      }),
  })

  async function onSubmit(formData: IResetPassword) {
    try {
      if (formData.newPassword !== formData.confirmPassword) {
        console.error('Las contraseñas no coinciden.')
        return
      }
      await AuthDataSourceImpl.getInstance().resetPassword(formData)

      router.push({ name: 'login' })
    } catch (error) {
      console.error(error)
    }
  }

  return {
    schema,
    onSubmit,
  }
}
