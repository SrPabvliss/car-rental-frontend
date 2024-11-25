import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { useToast } from 'vue-toastification'

import type { ICar } from '../interfaces/ICar'
import { CarDataSourceImpl } from '../services/datasource'

export default function useEditVehicle() {
  const vehicle = ref<ICar | null>(null)
  const isLoading = ref(false)
  const route = useRoute()
  const toast = useToast()

  const breadcrumbItems = ref([
    { label: 'Vehículos', href: 'cars' },
    { label: 'Editar', href: '', current: true },
  ])

  async function loadVehicle() {
    const vehicleId = Number(route.params.id)
    if (!vehicleId) {
      toast.error('No se encontró un ID válido')
      return
    }

    isLoading.value = true
    try {
      const data = await CarDataSourceImpl.getInstance().getById(vehicleId)
      vehicle.value = data
    } catch {
      toast.error('Error al cargar el vehículo')
    } finally {
      isLoading.value = false
    }
  }

  return {
    vehicle,
    breadcrumbItems,
    isLoading,
    loadVehicle,
  }
}
