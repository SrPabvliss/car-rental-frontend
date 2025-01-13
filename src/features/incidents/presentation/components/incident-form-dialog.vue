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
  description: z
    .string({ required_error: 'La descripción es requerida' })
    .trim()
    .min(10, { message: 'La descripción debe tener al menos 10 caracteres' })
    .max(200, { message: 'La descripción no puede exceder 200 caracteres' }),

  repairCost: z
    .number({ 
      required_error: 'El costo de reparación es requerido',
      invalid_type_error: 'El costo debe ser un número válido'
    })
    .nonnegative({ message: 'El costo no puede ser negativo' })
    .max(10000, { message: 'El costo parece ser muy alto' })
    .transform(val => Number(val.toFixed(2))),
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
          name="description"
          label="Descripción"
          v-model="formData.description"
          :error="errors.description || undefined"
          placeholder="Describe el incidente..."
        />

        <FormInput
          id="repairCost"
          type="number"
          step=".01"
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
