<!-- components/rental-summary.vue -->
<script setup lang="ts">
import type { IRental } from '@/features/rentals/interfaces/IRental'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

defineProps<{
  rental: IRental
}>()
</script>

<template>
  <Card>
    <CardHeader>
      <CardTitle>Detalles del Alquiler</CardTitle>
    </CardHeader>
    <CardContent>
      <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
        <div>
          <p class="text-sm text-muted-foreground">Cliente</p>
          <p class="font-medium">
            {{ rental.user.name }} {{ rental.user.lastName }}
          </p>
        </div>
        <div>
          <p class="text-sm text-muted-foreground">Vehículo</p>
          <p class="font-medium">
            {{ rental.car.brand }} {{ rental.car.model }}
          </p>
        </div>
        <div>
          <p class="text-sm text-muted-foreground">Fecha de Inicio</p>
          <p class="font-medium">{{ rental.startDate }}</p>
        </div>
        <div>
          <p class="text-sm text-muted-foreground">Fecha de Fin</p>
          <p class="font-medium">{{ rental.endDate }}</p>
        </div>
        <div>
          <p class="text-sm text-muted-foreground">Estado</p>
          <p class="font-medium">{{ rental.status }}</p>
        </div>
        <div>
          <p class="text-sm text-muted-foreground">Costo Base</p>
          <p class="font-medium">${{ rental.total }}</p>
        </div>
      </div>
    </CardContent>
  </Card>
</template>
