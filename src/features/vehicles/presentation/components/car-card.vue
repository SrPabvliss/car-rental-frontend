<script setup lang="ts">
import { Eye, CarFront, Edit, Trash, MoreVertical } from 'lucide-vue-next'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

import type { CarStatus, ICar } from '../../interfaces/ICar'

defineProps<{
  car: ICar
}>()

const getStatusColor = (status: string): string => {
  const statusColors = {
    Disponible: 'bg-green-100 text-green-800 hover:bg-green-100',
    'En mantenimiento': 'bg-yellow-100 text-yellow-800 hover:bg-yellow-100',
    Alquilado: 'bg-blue-100 text-blue-800 hover:bg-blue-100',
  }
  return (
    statusColors[status as keyof typeof statusColors] ??
    'bg-gray-100 text-gray-800 hover:bg-gray-100'
  )
}

const emit = defineEmits<{
  view: [id: number]
  edit: [id: number]
  delete: [id: number]
  changeStatus: [id: number, newStatus: CarStatus]
}>()
</script>

<template>
  <Card class="w-full h-[500px] flex flex-col car-card">
    <CardHeader class="p-0 flex-shrink-0">
      <div class="w-full h-[280px] relative group">
        <img
          :src="car.imageUrl"
          :alt="`${car.brand} ${car.model}`"
          class="w-full h-full object-cover rounded-t-md"
        />
        <!-- TODO: this should only be available on client and employee -->
        <div
          class="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity rounded-t-md"
        >
          <Button variant="secondary" size="sm" @click="emit('view', car.id)">
            <Eye class="h-4 w-4 mr-2" />
            Ver detalles
          </Button>
        </div>
      </div>
    </CardHeader>

    <CardContent class="p-4 flex-grow">
      <div class="flex justify-between items-start mb-3">
        <div class="flex flex-col">
          <h3 class="font-semibold text-lg leading-tight">
            {{ car.brand }} {{ car.model }}
          </h3>
          <p class="text-sm text-muted-foreground mt-1">
            {{ car.year }} • {{ car.type }}
          </p>
        </div>
        <div class="relative flex">
          <Badge
            :class="getStatusColor(car.status)"
            :data-testid="`car-status-${car.id}`"
          >
            {{ car.status }}
          </Badge>
          <DropdownMenu>
            <DropdownMenuTrigger
              as="button"
              class="ml-2"
              data-testid="menu-trigger"
            >
              <Button variant="ghost" size="icon">
                <MoreVertical class="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem
                @click="emit('changeStatus', car.id, 'Disponible' as CarStatus)"
                data-testid="status-option-disponible"
              >
                Disponible
              </DropdownMenuItem>
              <DropdownMenuItem
                @click="
                  emit('changeStatus', car.id, 'En mantenimiento' as CarStatus)
                "
                data-testid="status-option-mantenimiento"
              >
                En mantenimiento
              </DropdownMenuItem>
              <DropdownMenuItem
                @click="emit('changeStatus', car.id, 'Alquilado' as CarStatus)"
                data-testid="status-option-alquilado"
              >
                Alquilado
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div class="space-y-3">
        <div class="flex items-center text-sm text-muted-foreground">
          <CarFront class="h-4 w-4 mr-2" />
          {{ car.mileage.toLocaleString() }} km
        </div>
        <p class="text-xl font-semibold">${{ car.dailyRate.toFixed(2) }}/día</p>
      </div>
    </CardContent>

    <CardFooter class="p-4 pt-0 flex-shrink-0 flex gap-2">
      <Button class="flex-1" variant="default" @click="emit('edit', car.id)">
        <Edit class="h-4 w-4 mr-2" />
        Editar
      </Button>
      <Button
        class="flex-2 px-4"
        variant="destructive"
        @click="emit('delete', car.id)"
        :data-testid="`delete-button-${car.id}`"
      >
        <Trash class="h-4 w-4 mx-2" />
      </Button>
    </CardFooter>
  </Card>
</template>

<!-- TODO: Definir acciones según roles -->
<!--
1. Cliente:
   - Mostrar botón "Rentar ahora" (como estaba originalmente).
   - Mostrar detalles del vehículo sin opciones de edición.
2. Empleado:
   - Opciones para registrar alquiler o devoluciones.
   - Acceso al selector de estado.
   - No puede editar o eliminar vehículos.
3. Administrador:
   - Opciones actuales: Editar, Eliminar, Cambiar estado.
-->
