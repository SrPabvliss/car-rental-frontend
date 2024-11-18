<script setup lang="ts">
import useCarForm from '@/features/vehicles/composables/use-car-form'
import {
  CAR_BRANDS,
  CAR_STATUSES,
  CAR_TYPES,
} from '@/features/vehicles/constants'
import type { ICar } from '@/features/vehicles/interfaces/ICar'
import { useForm } from '@/lib/composables/use-form'
import LoadingSpinner from '@/shared/components/loading-spinner.vue'
import { watch } from 'vue'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

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
    <div>
      <Label for="brand">Marca</Label>
      <select
        v-model="formData.brand"
        id="brand"
        class="custom-select"
        @change="validateField('brand')"
      >
        <option value="">Seleccione una marca</option>
        <option v-for="brand in CAR_BRANDS" :key="brand" :value="brand">
          {{ brand }}
        </option>
      </select>
      <p v-if="errors.brand" class="text-red-500 text-xs">{{ errors.brand }}</p>
    </div>

    <div>
      <Label for="model">Modelo</Label>
      <Input
        v-model="formData.model"
        id="model"
        placeholder="Ej. Corolla"
        @input="validateField('model')"
        class="border-gray-600"
      />
      <p v-if="errors.model" class="text-red-500 text-xs">{{ errors.model }}</p>
    </div>

    <div>
      <Label for="color">Color</Label>
      <Input
        v-model="formData.color"
        id="color"
        placeholder="Ej. Negro"
        class="border-gray-600"
        @input="validateField('color')"
      />
      <p v-if="errors.color" class="text-red-500 text-xs">{{ errors.color }}</p>
    </div>

    <div>
      <Label for="plate">Placa</Label>
      <Input
        v-model="formData.plate"
        id="plate"
        placeholder="Ej. ABC123"
        @input="validateField('plate')"
        class="border-gray-600"
      />
      <p v-if="errors.plate" class="text-red-500 text-xs">{{ errors.plate }}</p>
    </div>

    <div>
      <Label for="type">Tipo</Label>
      <select
        v-model="formData.type"
        id="type"
        class="custom-select"
        @change="validateField('type')"
      >
        <option value="">Seleccione un tipo</option>
        <option v-for="type in CAR_TYPES" :key="type" :value="type">
          {{ type }}
        </option>
      </select>
      <p v-if="errors.type" class="text-red-500 text-xs">{{ errors.type }}</p>
    </div>

    <div>
      <Label for="status">Estado</Label>
      <select
        v-model="formData.status"
        id="status"
        class="custom-select"
        @change="validateField('status')"
      >
        <option value="">Seleccione un estado</option>
        <option v-for="status in CAR_STATUSES" :key="status" :value="status">
          {{ status }}
        </option>
      </select>
      <p v-if="errors.status" class="text-red-500 text-xs">
        {{ errors.status }}
      </p>
    </div>

    <div>
      <Label for="year">Año</Label>
      <Input
        v-model="formData.year"
        id="year"
        type="number"
        placeholder="Ej. 2023"
        class="border-gray-600"
        @input="validateField('year')"
      />
      <p v-if="errors.year" class="text-red-500 text-xs">{{ errors.year }}</p>
    </div>

    <div>
      <Label for="mileage">Kilometraje</Label>
      <Input
        v-model="formData.mileage"
        id="mileage"
        type="number"
        placeholder="Ej. 15000"
        class="border-gray-600"
        @input="validateField('mileage')"
      />
      <p v-if="errors.mileage" class="text-red-500 text-xs">
        {{ errors.mileage }}
      </p>
    </div>

    <div>
      <Label for="dailyRate">Tarifa diaria</Label>
      <Input
        v-model="formData.dailyRate"
        id="dailyRate"
        type="number"
        placeholder="Ej. 90.0"
        class="border-gray-600"
        @input="validateField('dailyRate')"
      />
      <p v-if="errors.dailyRate" class="text-red-500 text-xs">
        {{ errors.dailyRate }}
      </p>
    </div>

    <div class="flex flex-col gap-2">
      <Label for="imageUrl">Imagen del vehículo</Label>
      <Button
        type="button"
        class="btn btn-secondary"
        @click="openWidget"
        :disabled="isLoading"
        variant="outline"
      >
        Subir Imagen
      </Button>
      <p v-if="imageUrl" class="mt-4">
        <Label>Imagen cargada:</Label>
        <img
          :src="imageUrl"
          alt="Uploaded Image"
          class="mt-2 w-40 h-40 object-cover"
        />
      </p>
    </div>

    <Button type="submit" :disabled="isLoading">
      <LoadingSpinner v-if="isLoading" size="small" />
      <span v-else>Crear Vehículo</span>
    </Button>
  </form>
</template>

<style scoped>
@import '@/assets/select.css';
</style>
