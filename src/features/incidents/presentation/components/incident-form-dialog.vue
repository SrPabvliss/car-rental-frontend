<script setup lang="ts">
import { useForm } from '@/lib/composables/use-form'
import { FormInput, FormTextarea } from '@/shared/components/forms'
import { watch } from 'vue'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog'

import {
  type IIncident,
  type ICreateIncident,
  INCIDENT_STATUS,
} from '../../interfaces/IIncident'

interface FormData {
  description: string
  repairCost: number
}

const props = defineProps<{
  show: boolean
  incident?: IIncident
  rentalId: number
}>()

const emit = defineEmits<{
  'update:show': [value: boolean]
  submit: [incident: ICreateIncident]
}>()

const schema = z.object({
  description: z.string().min(1, 'La descripción es requerida'),
  repairCost: z.coerce
    .number({
      required_error: 'El costo es requerido',
      invalid_type_error: 'Debe ser un número',
    })
    .min(0, 'El costo debe ser mayor o igual a 0'),
})

const { formData, errors, handleSubmit, resetForm } = useForm<FormData>(
  schema,
  {
    description: '',
    repairCost: 0,
  },
)

// Observar cambios en el incidente para actualizar el formulario
watch(
  () => props.incident,
  newIncident => {
    if (newIncident) {
      formData.description = newIncident.description
      formData.repairCost = newIncident.repairCost
    } else {
      resetForm({
        description: '',
        repairCost: 0,
      })
    }
  },
  { immediate: true },
)

// Observar cambios en show para resetear el formulario cuando se cierra
watch(
  () => props.show,
  newShow => {
    if (!newShow) {
      resetForm({
        description: '',
        repairCost: 0,
      })
    }
  },
)

const submitForm = () => {
  handleSubmit((data: FormData) => {
    const submitData: ICreateIncident = {
      description: data.description,
      repairCost: Number(data.repairCost),
      status: INCIDENT_STATUS.PENDING,
      reportedAt: new Date(),
      photoEvidenceUrl: null,
      rentalId: props.rentalId,
    }
    emit('submit', submitData)
  })
}

const onClose = () => {
  emit('update:show', false)
}
</script>

<template>
  <Dialog :open="show" @update:open="onClose">
    <DialogContent class="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>
          {{ incident ? 'Editar' : 'Crear' }} Incidente
        </DialogTitle>
      </DialogHeader>

      <form @submit.prevent="submitForm" class="space-y-4">
        <FormTextarea
          id="description"
          label="Descripción"
          v-model="formData.description"
          :error="errors.description || undefined"
          placeholder="Describe el incidente..."
        />

        <FormInput
          id="repairCost"
          type="text"
          inputmode="numeric"
          label="Costo de Reparación"
          v-model="formData.repairCost"
          :error="errors.repairCost"
          placeholder="0.00"
        />

        <DialogFooter>
          <Button type="button" variant="outline" @click="onClose">
            Cancelar
          </Button>
          <Button type="submit">
            {{ incident ? 'Guardar Cambios' : 'Crear Incidente' }}
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  </Dialog>
</template>
