<script setup lang="ts">
import useCarForm from '@/features/vehicles/composables/use-car-form'
import {
  CAR_BRANDS,
  CAR_STATUSES,
  CAR_TYPES,
} from '@/features/vehicles/constants'
import type { ICar } from '@/features/vehicles/interfaces/ICar'
import { useForm } from '@/lib/composables/use-form'
import { FormInput, FormSelect } from '@/shared/components/forms'
import LoadingSpinner from '@/shared/components/loading-spinner.vue'
import { watch } from 'vue'

import { Button } from '@/components/ui/button'

import ImageUpload from './image-upload.vue'

const props = defineProps<{
  car?: ICar | null
}>()

const { schema, onSubmit, isLoading, openWidget, imageUrl } = useCarForm(
  props.car,
)
const { formData, errors, handleSubmit, validateField, resetForm } = useForm(
  schema,
  props.car ?? undefined,
)

watch(
  () => props.car,
  newCar => {
    if (newCar) {
      resetForm(newCar)
    }
  },
  { immediate: true },
)

const submitForm = () => handleSubmit(onSubmit)
</script>

<template>
  <form @submit.prevent="submitForm" class="space-y-6 mt-4">
    <FormSelect
      id="brand"
      label="Marca"
      :placeholder="'Seleccione una marca'"
      :options="CAR_BRANDS.map(brand => ({ value: brand, label: brand }))"
      v-model="formData.brand"
      :error="errors.brand"
      @update:modelValue="validateField('brand')"
    />

    <FormInput
      id="model"
      label="Modelo"
      placeholder="Ej. Corolla"
      v-model="formData.model"
      :error="errors.model"
      @update:modelValue="validateField('model')"
    />

    <FormInput
      id="color"
      label="Color"
      placeholder="Ej. Negro"
      v-model="formData.color"
      :error="errors.color"
      @update:modelValue="validateField('color')"
    />

    <FormInput
      id="plate"
      label="Placa"
      placeholder="Ej. ABC123"
      v-model="formData.plate"
      :error="errors.plate"
      @update:modelValue="validateField('plate')"
    />

    <FormSelect
      id="type"
      label="Tipo"
      :placeholder="'Seleccione un tipo'"
      :options="CAR_TYPES.map(type => ({ value: type, label: type }))"
      v-model="formData.type"
      :error="errors.type"
      @update:modelValue="validateField('type')"
    />

    <FormSelect
      id="status"
      label="Estado"
      :placeholder="'Seleccione un estado'"
      :options="CAR_STATUSES.map(status => ({ value: status, label: status }))"
      v-model="formData.status"
      :error="errors.status"
      @update:modelValue="validateField('status')"
    />

    <FormInput
      id="year"
      label="Año"
      type="number"
      placeholder="Ej. 2023"
      v-model="formData.year"
      :error="errors.year"
      @update:modelValue="validateField('year')"
    />

    <FormInput
      id="mileage"
      label="Kilometraje"
      type="number"
      placeholder="Ej. 15000"
      v-model="formData.mileage"
      :error="errors.mileage"
      @update:modelValue="validateField('mileage')"
    />

    <FormInput
      id="dailyRate"
      label="Tarifa diaria"
      type="number"
      placeholder="Ej. 90.0"
      v-model="formData.dailyRate"
      :error="errors.dailyRate"
      @update:modelValue="validateField('dailyRate')"
    />

    <ImageUpload
      :imageUrl="imageUrl"
      :isLoading="isLoading"
      @upload="openWidget"
    />

    <Button type="submit" :disabled="isLoading">
      <LoadingSpinner v-if="isLoading" size="small" />
      <span v-else>{{ props.car ? 'Editar vehículo' : 'Crear vehículo' }}</span>
    </Button>
  </form>
</template>

<style scoped>
@import '@/assets/select.css';
</style>
