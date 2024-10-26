import { z } from 'zod'
import { AuthDataSourceImpl } from '../services/datasource'
import router from '@/router'
import { useModulesStore } from '@/core/context/modules-store'
import useNavLinks from '@/core/composables/use-navlinks'

interface LoginForm {
  email: string
  password: string
}

export default function useLogin() {
  const schema = z.object({
    email: z
      .string({ required_error: 'El email es requerido.' })
      .min(4, { message: 'El email debe tener al menos 4 caracteres.' }),

    password: z
      .string({ required_error: 'La contraseña es requerida.' })
      .min(3, { message: 'La contraseña debe tener al menos 3 caracteres.' }),
  })

  async function onSubmit(formData: LoginForm) {
    const data = await AuthDataSourceImpl.getInstance().login(formData)
    if (!data) return
    useModulesStore().setModules(useNavLinks(data.role))
    const modules = useModulesStore().modules
    router.push({ name: modules[0].href, query: { role: data.role } })
  }

  return {
    schema,
    onSubmit,
  }
}
