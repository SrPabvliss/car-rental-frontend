// features/incidents/composables/use-incidents.ts
import { ref } from 'vue'
import { useToast } from 'vue-toastification'

import type {
  IIncident,
  ICreateIncident,
  IUpdateIncident,
} from '../interfaces/IIncident'
import { IncidentDataSourceImpl } from '../services/datasource'

export function useIncidents(rentalId: string | number) {
  const incidents = ref<IIncident[]>([])
  const isLoading = ref(false)
  const toast = useToast()

  const fetchIncidents = async () => {
    isLoading.value = true
    try {
      incidents.value =
        await IncidentDataSourceImpl.getInstance().getByRentalId(
          Number(rentalId),
        )
    } catch (error) {
      toast.error('Error al cargar los incidentes')
      console.error('Error fetching incidents:', error)
    } finally {
      isLoading.value = false
    }
  }

  const createIncident = async (incident: ICreateIncident) => {
    isLoading.value = true
    try {
      await IncidentDataSourceImpl.getInstance().create(incident)
      toast.success('Incidente creado exitosamente')
      await fetchIncidents()
    } catch (error) {
      toast.error('Error al crear el incidente')
      console.error('Error creating incident:', error)
    } finally {
      isLoading.value = false
    }
  }

  const updateIncident = async (id: number, incident: IUpdateIncident) => {
    isLoading.value = true
    try {
      await IncidentDataSourceImpl.getInstance().update(id, incident)
      toast.success('Incidente actualizado exitosamente')
      await fetchIncidents()
    } catch (error) {
      toast.error('Error al actualizar el incidente')
      console.error('Error updating incident:', error)
    } finally {
      isLoading.value = false
    }
  }

  const deleteIncident = async (id: number) => {
    isLoading.value = true
    try {
      await IncidentDataSourceImpl.getInstance().delete(id)
      toast.success('Incidente eliminado exitosamente')
      await fetchIncidents()
    } catch (error) {
      toast.error('Error al eliminar el incidente')
      console.error('Error deleting incident:', error)
    } finally {
      isLoading.value = false
    }
  }

  return {
    incidents,
    isLoading,
    fetchIncidents,
    createIncident,
    updateIncident,
    deleteIncident,
  }
}
