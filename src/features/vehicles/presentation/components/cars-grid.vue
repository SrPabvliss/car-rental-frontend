<script setup lang="ts">

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

import type { ICar, CarStatus } from '../../interfaces/ICar'
import CarCard from './car-card.vue'

defineProps<{
  cars: ICar[]
  loading?: boolean
  role: string
}>()

const emit = defineEmits<{
  view: [id: number]
  edit: [id: number]
  delete: [id: number]
  changeStatus: [id: number, newStatus: CarStatus]
}>()
</script>

<template>
  <div>
    <Card v-if="!cars.length && !loading" class="border-dashed">
      <CardHeader>
        <CardTitle>No hay vehículos disponibles</CardTitle>
        <CardDescription>
          No se encontraron vehículos que coincidan con los filtros
          seleccionados.
        </CardDescription>
      </CardHeader>
    </Card>

    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <template v-if="loading">
        <Card v-for="n in 6" :key="n" class="animate-pulse">
          <CardHeader class="p-0">
            <div class="aspect-video bg-muted" />
          </CardHeader>
          <CardContent class="p-4 space-y-2">
            <div class="h-4 bg-muted rounded w-3/4" />
            <div class="h-4 bg-muted rounded w-1/2" />
            <div class="h-4 bg-muted rounded w-1/4" />
          </CardContent>
        </Card>
      </template>

      <template v-else>
        <CarCard
          v-for="car in cars"
          :key="car.id"
          :car="car"
          :role="role"
          @view="id => emit('view', id)"
          @edit="id => emit('edit', id)"
          @delete="id => emit('delete', id)"
          @changeStatus="(id, newStatus) => emit('changeStatus', id, newStatus)"
        />
      </template>
    </div>
  </div>
</template>
