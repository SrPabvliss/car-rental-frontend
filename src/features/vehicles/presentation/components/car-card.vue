<!-- car-card.vue -->
<script setup lang="ts">
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Eye, CarFront } from 'lucide-vue-next'
import type { ICar } from '../../interfaces/ICar'

defineProps<{
  car: ICar
}>()

const getStatusColor = (status: string): string => {
  const statusColors = {
    available: 'bg-green-100 text-green-800 hover:bg-green-100',
    maintenance: 'bg-yellow-100 text-yellow-800 hover:bg-yellow-100',
    rented: 'bg-blue-100 text-blue-800 hover:bg-blue-100',
    unavailable: 'bg-gray-100 text-gray-800 hover:bg-gray-100',
  }
  return (
    statusColors[status as keyof typeof statusColors] ??
    statusColors.unavailable
  )
}

const emit = defineEmits<{
  view: [id: number]
  rent: [id: number]
}>()
</script>

<template>
  <Card class="overflow-hidden">
    <CardHeader class="p-0">
      <div class="aspect-video relative group">
        <img
          :src="car.imageUrl"
          :alt="`${car.brand} ${car.model}`"
          class="w-full h-full object-cover"
        />
        <div
          class="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <Button variant="secondary" size="sm" @click="emit('view', car.id)">
            <Eye class="h-4 w-4 mr-2" />
            Ver detalles
          </Button>
        </div>
      </div>
    </CardHeader>

    <CardContent class="p-4">
      <div class="flex justify-between items-start mb-2">
        <div>
          <h3 class="font-semibold text-lg">{{ car.brand }} {{ car.model }}</h3>
          <p class="text-sm text-muted-foreground">
            {{ car.year }} •
            {{ car.type.charAt(0).toUpperCase() + car.type.slice(1) }}
          </p>
        </div>
        <Badge :class="getStatusColor(car.status)">
          {{ car.status.charAt(0).toUpperCase() + car.status.slice(1) }}
        </Badge>
      </div>

      <div class="space-y-2">
        <div class="flex items-center text-sm text-muted-foreground">
          <CarFront class="h-4 w-4 mr-2" />
          {{ car.mileage.toLocaleString() }} km
        </div>
        <p class="text-xl font-semibold">${{ car.dailyRate.toFixed(2) }}/día</p>
      </div>
    </CardContent>

    <CardFooter class="p-4 pt-0">
      <Button
        class="w-full"
        :disabled="car.status !== 'available'"
        @click="emit('rent', car.id)"
      >
        {{ car.status === 'available' ? 'Rentar ahora' : 'No disponible' }}
      </Button>
    </CardFooter>
  </Card>
</template>
