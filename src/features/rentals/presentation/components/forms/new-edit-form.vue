<script setup lang="ts">
import useRentalForm from '@/features/rentals/composables/use-rental-form'
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

const props = defineProps<{
  carId: number
}>()

const { schema, onSubmit, isLoading, car, calculateTotal, days } =
  useRentalForm(props.carId)
const { formData, errors, handleSubmit, validateField, resetForm } = useForm(
  schema,
  undefined,
)

const total = computed(() => {
  if (!formData.startDate || !formData.endDate) return 0
  return calculateTotal(formData.startDate, formData.endDate)
})

const submitForm = () => handleSubmit(onSubmit)

watch(
  () => car.value,
  newCar => {
    if (newCar) {
      resetForm()
    }
  },
  { immediate: true },
)
</script>

<template>
  <div class="grid gap-6">
    <Card v-if="car">
      <CardHeader>
        <CardTitle>Información del Vehículo</CardTitle>
        <CardDescription>
          Detalles del vehículo que deseas alquilar
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div class="grid grid-cols-2 gap-4">
          <div class="space-y-1">
            <img
              v-if="car.imageUrl"
              :src="car.imageUrl"
              :alt="car.model"
              class="w-full h-48 object-cover rounded-md"
            />
          </div>
          <div class="space-y-2">
            <div>
              <h3 class="font-semibold">{{ car.brand }} {{ car.model }}</h3>
              <p class="text-sm text-muted-foreground">
                {{ car.year }} • {{ car.type }}
              </p>
            </div>
            <p class="text-lg font-semibold">
              ${{ car.dailyRate.toFixed(2) }}/día
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
            Selecciona las fechas de tu alquiler
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
                <span>${{ car?.dailyRate.toFixed(2) }}</span>
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
        data-testid="submit-rental-form"
      >
        <LoadingSpinner v-if="isLoading" size="small" />
        <span v-else>Confirmar Alquiler</span>
      </Button>
    </form>
  </div>
</template>
