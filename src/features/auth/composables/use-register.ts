import type { ICreateUser } from '@/features/users/interfaces/IUser'
import { z } from 'zod'
import { AuthDataSourceImpl } from '../services/datasource'
import router from '@/router'

type RegisterForm = ICreateUser
const phoneRegex = new RegExp(
  /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/,
)

export default function useRegister() {
  const schema = z.object({
    name: z
      .string({ required_error: 'El nombre es requerido.' })
      .min(3, { message: 'El nombre debe tener al menos 3 caracteres.' }),
    lastName: z
      .string({ required_error: 'El apellido es requerido.' })
      .min(3, { message: 'El apellido debe tener al menos 3 caracteres.' }),
    email: z
      .string({ required_error: 'El email es requerido.' })
      .email({ message: 'El email no es válido.' }),
    password: z
      .string({ required_error: 'La contraseña es requerida.' })
      .min(3, { message: 'La contraseña debe tener al menos 3 caracteres.' }),
    address: z
      .string({ required_error: 'La dirección es requerida.' })
      .min(3, { message: 'La dirección debe tener al menos 3 caracteres.' }),
    phone: z
      .string({ required_error: 'El teléfono es requerido.' })
      .regex(phoneRegex, { message: 'El teléfono no es válido.' })
      .min(3, { message: 'El teléfono debe tener al menos 3 caracteres.' })
      .max(15, { message: 'El teléfono debe tener máximo 15 caracteres.' }),
  })

  async function onSubmit(formData: RegisterForm) {
    const data = await AuthDataSourceImpl.getInstance().register(formData)
    if (!data) return

    router.push({ name: 'login' })
  }

  return {
    schema,
    onSubmit,
  }
}
