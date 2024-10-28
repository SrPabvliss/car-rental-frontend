import { z } from 'zod'
import { AuthDataSourceImpl } from '../services/datasource'
import type { IResetPassword } from '../interfaces/IRecoverPassword'

export default function useResetPassword() {
  //@ts-expect-error - token is required
  const schema = z.object({
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
      .refine(data => data === schema._def.shape.newPassword, {
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
    } catch (error) {
      console.error(error)
    }
  }

  return {
    schema,
    onSubmit,
  }
}
