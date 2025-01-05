import { ref, onMounted } from 'vue'
import { useToast } from 'vue-toastification'

import type { IUser } from '../interfaces/IUser'
import { CarDataSourceImpl } from '../services/datasource'

export function useClients() {
  const loading = ref(false)
  const clients = ref<IUser[]>([])
  const error = ref<string | null>(null)
  const toast = useToast()

  const fetchClients = async () => {
    loading.value = true
    error.value = null

    try {
      const data = await CarDataSourceImpl.getInstance().getClients()
      clients.value = data
    } catch {
      error.value = 'Error al cargar los clientes'
      toast.error('No se pudieron cargar los clientes')
    } finally {
      loading.value = false
    }
  }

  const getClientById = (id: number) => {
    return clients.value.find(client => client.id === id)
  }

  const getClientName = (id: number) => {
    const client = getClientById(id)
    return client
      ? `${client.name} ${client.lastName}`
      : 'Cliente no encontrado'
  }

  onMounted(() => {
    fetchClients()
  })

  return {
    clients,
    loading,
    error,
    fetchClients,
    getClientById,
    getClientName,
  }
}
