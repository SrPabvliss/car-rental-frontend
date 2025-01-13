<!-- features/incidents/presentation/views/incident-list.vue -->
<script setup lang="ts">
import { Plus } from 'lucide-vue-next'
import { ref, onMounted } from 'vue'
import { useToast } from 'vue-toastification'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

import type { ICreateIncident, IIncident } from '../../interfaces/IIncident'
import { IncidentDataSourceImpl } from '../../services/datasource'
import IncidentFormDialog from '../components/incident-form-dialog.vue'
import IncidentListItem from '../components/incident-list-item.vue'
import { format } from 'date-fns'

const props = defineProps<{
  rentalId: string | number
}>()

const incidents = ref<IIncident[]>([])
const isLoading = ref(false)
const showForm = ref(false)
const selectedIncident = ref<IIncident | undefined>()
const toast = useToast()

const fetchIncidents = async () => {
  isLoading.value = true
  try {
    incidents.value = await IncidentDataSourceImpl.getInstance().getByRentalId(
      Number(props.rentalId),
    )
  } finally {
    isLoading.value = false
  }
}

const handleAdd = () => {
  selectedIncident.value = undefined
  showForm.value = true
}

const handleEdit = (incident: IIncident) => {
  selectedIncident.value = incident
  showForm.value = true
}

const handleDelete = async (id: number) => {
  try {
    await IncidentDataSourceImpl.getInstance().delete(id)
    toast.success('Incidente eliminado exitosamente')
    await fetchIncidents()
  } catch {
    toast.error('Error al eliminar el incidente')
  }
}

const handleSubmit = async (data: ICreateIncident) => {
  try {
    if (selectedIncident.value) {
      await IncidentDataSourceImpl.getInstance().update(
        selectedIncident.value.id,
        {
          ...data,
          reportedAt: format(new Date(selectedIncident.value.reportedAt), 'dd/MM/yyyy:HH:mm') as any,
        },
      )
      toast.success('Incidente actualizado exitosamente')
    } else {
      await IncidentDataSourceImpl.getInstance().create(data)
      toast.success('Incidente creado exitosamente')
    }
    showForm.value = false
    await fetchIncidents()
  } catch {
    toast.error('Error al guardar el incidente')
  }
}

onMounted(() => {
  fetchIncidents()
})
</script>

<template>
  <Card>
    <CardHeader
      class="flex flex-row items-center justify-between space-y-0 pb-4"
    >
      <CardTitle>Incidentes Reportados</CardTitle>
      <Button size="sm" @click="handleAdd">
        <Plus class="h-4 w-4 mr-2" />
        Agregar Incidente
      </Button>
    </CardHeader>
    <CardContent>
      <div v-if="isLoading" class="text-center py-4">
        Cargando incidentes...
      </div>
      <div
        v-else-if="incidents.length === 0"
        class="text-center py-4 text-muted-foreground"
      >
        No hay incidentes registrados
      </div>
      <div v-else class="space-y-4">
        <IncidentListItem
          v-for="incident in incidents"
          :key="incident.id"
          :incident="incident"
          @edit="handleEdit"
          @delete="handleDelete"
        />
      </div>
    </CardContent>
  </Card>

  <IncidentFormDialog
    v-model:show="showForm"
    :incident="selectedIncident"
    :rental-id="Number(rentalId)"
    @submit="handleSubmit"
  />
</template>
