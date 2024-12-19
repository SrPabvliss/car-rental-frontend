<script setup lang="ts">
import { useForm } from '@/lib/composables/use-form'
import FormCalendar from '@/shared/components/forms/form-calendar.vue'
import LoadingSpinner from '@/shared/components/loading-spinner.vue'
import { watch, computed } from 'vue'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'

import type { IRental } from '@/features/rentals/interfaces/IRental'
import useEditRental from '@/features/rentals/composables/use-edit-rental'

const props = defineProps<{
  rental: IRental
}>()

const { schema, onSubmit, isLoading, calculateTotal, calculateDays } = useEditRental(props.rental)
const { formData, errors, handleSubmit, validateField, resetForm } = useForm(
  schema,
  {
    startDate: props.rental.startDate ? new Date(props.rental.startDate) : undefined,
    endDate: props.rental.endDate ? new Date(props.rental.endDate) : undefined
  }
)

const total = computed(() => {
  if (!formData.startDate || !formData.endDate) return props.rental.total
  return calculateTotal(formData.startDate, formData.endDate)
})

const days = computed(() => {
  return calculateDays(formData.startDate, formData.endDate)
})

const submitForm = () => handleSubmit(onSubmit)

watch(
  () => props.rental,
  newRental => {
    if (newRental) {
      resetForm({
        startDate: newRental.startDate ? new Date(newRental.startDate) : undefined,
        endDate: newRental.endDate ? new Date(newRental.endDate) : undefined
      })
    }
  },
  { immediate: true }
)
</script>

<template>
  <div class="grid gap-6">
    <Card>
      <CardHeader>
        <CardTitle>Información del Vehículo</CardTitle>
        <CardDescription>
          Detalles del vehículo alquilado
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div class="grid grid-cols-2 gap-4">
          <div class="space-y-1">
            <img
              v-if="rental.car.imageUrl"
              :src="rental.car.imageUrl"
              :alt="rental.car.model"
              class="w-full h-48 object-cover rounded-md"
            />
          </div>
          <div class="space-y-2">
            <div>
              <h3 class="font-semibold">{{ rental.car.brand }} {{ rental.car.model }}</h3>
              <p class="text-sm text-muted-foreground">
                {{ rental.car.year }} • {{ rental.car.type }}
              </p>
            </div>
            <p class="text-lg font-semibold">
              ${{ rental.car.dailyRate.toFixed(2) }}/día
            </p>
          </div>
        </div>
      </CardContent>
    </Card>

    <form @submit.prevent="submitForm" class="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Detalles del Alquiler</CardTitle>
          <CardDescription>
            Modifica las fechas de tu alquiler
          </CardDescription>
        </CardHeader>
        <CardContent class="space-y-4">
          <FormCalendar
            id="startDate"
            label="Fecha de inicio"
            v-model="formData.startDate"
            placeholder="Seleccionar fecha de inicio"
            :error="errors.startDate"
            @update:modelValue="validateField('startDate')"
          />

          <FormCalendar
            id="endDate"
            label="Fecha de fin"
            v-model="formData.endDate"
            placeholder="Seleccionar fecha de fin"
            :error="errors.endDate"
            @update:modelValue="validateField('endDate')"
          />

          <Separator class="my-4" />

          <div class="space-y-2">
            <h4 class="font-medium">Resumen de costos</h4>
            <div class="space-y-1">
              <div class="flex justify-between text-sm">
                <span>Tarifa diaria:</span>
                <span>${{ rental.car.dailyRate.toFixed(2) }}</span>
              </div>
              <div class="flex justify-between text-sm">
                <span>Días de alquiler:</span>
                <span>{{ days ? days : 0 }}</span>
              </div>
              <Separator class="my-2" />
              <div class="flex justify-between font-semibold">
                <span>Total:</span>
                <span>${{ total.toFixed(2) }}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Button
        type="submit"
        :disabled="isLoading"
        class="w-full"
        data-testid="submit-rental-edit-form"
      >
        <LoadingSpinner v-if="isLoading" size="small" />
        <span v-else>Guardar Cambios</span>
      </Button>
    </form>
  </div>
</template>