import useNavLinks from '@/core/composables/use-navlinks'
import { useModulesStore } from '@/core/context/modules-store'
import router from '@/router'
import { useToast } from 'vue-toastification'
import { z } from 'zod'

import { AuthDataSourceImpl } from '../services/datasource'

interface LoginForm {
  email: string
  password: string
}

export default function useLogin() {
  const schema = z.object({
    email: z
      .string({ required_error: 'El email es requerido.' })
      .min(4, { message: 'El email debe tener al menos 4 caracteres.' })
      .email({ message: 'El email no es válido.' }),
    password: z
      .string({ required_error: 'La contraseña es requerida.' })
      .min(3, { message: 'La contraseña debe tener al menos 3 caracteres.' }),
  })

  async function onSubmit(formData: LoginForm) {
    const toast = useToast()
    try {
      const data = await AuthDataSourceImpl.getInstance().login(formData)
      if (!data) return
      useModulesStore().setModules(useNavLinks('admin'))
      const modules = useModulesStore().modules
      router.push({ name: modules[0].href })
    } catch (error) {
      console.error(error)
      toast.error('Error al iniciar sesión')
    }
  }

  return {
    schema,
    onSubmit,
  }
}
