<script setup lang="ts">
import { CarFront, Edit, Trash, MoreVertical } from 'lucide-vue-next'

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
  role: string
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
  rent: [id: number]
}>()
</script>

<template>
  <Card class="w-full h-[500px] flex flex-col car-card">
    <CardHeader class="p-0 flex-shrink-0">
      <div class="w-full h-[270px]">
        <img
          :src="car.imageUrl"
          :alt="`${car.brand} ${car.model}`"
          class="w-full h-full object-cover rounded-t-md"
        />
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
          <p class="text-sm text-muted-foreground mt-1">{{ car.color }}</p>
        </div>
        <div class="relative flex">
          <Badge
            :class="getStatusColor(car.status)"
            :data-testid="`car-status-${car.id}`"
          >
            {{ car.status }}
          </Badge>

          <DropdownMenu v-if="['Administrador', 'Empleado'].includes(role)">
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
      <Button
        v-if="role === 'Cliente' && car.status === 'Disponible'"
        class="flex-1"
        variant="default"
        @click="emit('rent', car.id)"
        data-testid="rent-car-button"
      >
        Rentar ahora
      </Button>

      <template v-if="role === 'Administrador'">
        <Button
          class="flex-1"
          variant="default"
          @click="emit('edit', car.id)"
          data-testid="edit-car-button"
        >
          <Edit class="h-4 w-4 mr-2" />
          Editar
        </Button>
        <Button
          class="flex-2 px-4"
          variant="destructive"
          @click="emit('delete', car.id)"
          data-testid="delete-button"
        >
          <Trash class="h-4 w-4 mx-2" />
        </Button>
      </template>
    </CardFooter>
  </Card>
</template>
