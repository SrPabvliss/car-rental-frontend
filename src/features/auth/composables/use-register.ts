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
      .trim()
      .min(3, { message: 'El nombre debe tener al menos 3 caracteres.' })
      .max(50, { message: 'El nombre no puede exceder 50 caracteres.' })
      .regex(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/, { 
        message: 'El nombre solo puede contener letras y espacios.' 
      }),

    lastName: z
      .string({ required_error: 'El apellido es requerido.' })
      .trim()
      .min(3, { message: 'El apellido debe tener al menos 3 caracteres.' })
      .max(50, { message: 'El apellido no puede exceder 50 caracteres.' })
      .regex(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/, { 
        message: 'El apellido solo puede contener letras y espacios.' 
      }),

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
      ),

    password: z
      .string({ required_error: 'La contraseña es requerida.' })
      .min(5, { message: 'La contraseña debe tener al menos 5 caracteres.' })
      .max(50, { message: 'La contraseña no puede exceder 50 caracteres.' })
      .refine(
        (pass) => !pass.includes(' '), 
        'La contraseña no puede contener espacios.'
      ),

    address: z
      .string({ required_error: 'La dirección es requerida.' })
      .trim()
      .min(5, { message: 'La dirección debe tener al menos 5 caracteres.' })
      .max(100, { message: 'La dirección no puede exceder 100 caracteres.' }),

    phone: z
      .string({ required_error: 'El teléfono es requerido.' })
      .trim()
      .min(7, { message: 'El teléfono debe tener al menos 7 caracteres.' })
      .max(15, { message: 'El teléfono no puede exceder 15 caracteres.' })
      .regex(/^\+?[0-9]{7,15}$/, { 
        message: 'Ingrese un número de teléfono válido (solo números, puede incluir + al inicio).' 
      })
  })


  async function onSubmit(formData: RegisterForm) {
    if (isLoading.value) return

    isLoading.value = true
    try {
      const data = await AuthDataSourceImpl.getInstance().register({
        ...formData,
        role: ROLE_ENUM.EMPLOYEE,
      })
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
