import { ROLE_ENUM } from '@/features/users/constants/RoleEnum'
import type { ICreateUser } from '@/features/users/interfaces/IUser'
import router from '@/router'
import { ref } from 'vue'
import { useToast } from 'vue-toastification'
import { z } from 'zod'

import { AuthDataSourceImpl } from '../services/datasource'

type RegisterForm = ICreateUser

export default function useRegister() {
  const toast = useToast()
  const isLoading = ref(false)

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
      .min(5, { message: 'La contraseña debe tener al menos 5 caracteres.' }),
    address: z
      .string({ required_error: 'La dirección es requerida.' })
      .min(3, { message: 'La dirección debe tener al menos 3 caracteres.' }),
    role: z.enum([...Object.values(ROLE_ENUM)] as [ROLE_ENUM, ...ROLE_ENUM[]], {
      message: 'El rol no es válido.',
    }),
    phone: z.preprocess(
      val => (typeof val === 'number' ? val.toString() : val),
      z
        .string({ required_error: 'El teléfono es requerido.' })
        .min(3, { message: 'El teléfono debe tener al menos 3 caracteres.' })
        .max(15, { message: 'El teléfono debe tener máximo 15 caracteres.' }),
    ),
  })

  async function onSubmit(formData: RegisterForm) {
    if (isLoading.value) return // Previene múltiples envíos simultáneos

    isLoading.value = true
    try {
      const data = await AuthDataSourceImpl.getInstance().register(formData)
      if (!data) return
      router.push({ name: 'login' })
    } catch (error) {
      console.error(error)
      toast.error('Error al registrar el usuario.')
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
