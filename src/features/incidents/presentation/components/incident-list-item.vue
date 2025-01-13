<!-- features/incidents/presentation/components/incident-list-item.vue -->
<script setup lang="ts">
import { Edit, Trash } from 'lucide-vue-next'

import { Button } from '@/components/ui/button'

import type { IIncident } from '../../interfaces/IIncident'

defineProps<{
  incident: IIncident
}>()

defineEmits<{
  edit: [incident: IIncident]
  delete: [id: number]
}>()
</script>

<template>
  <div class="flex items-center justify-between p-4 border rounded-lg">
    <div class="space-y-1">
      <h4 class="font-medium">{{ incident.description }}</h4>
      <div class="flex gap-4 text-sm text-muted-foreground">
        <p>Costo: ${{ incident.repairCost }}</p>
        <p>Estado: {{ incident.status }}</p>
      </div>
    </div>
    <div class="flex gap-2">
      <Button size="sm" variant="outline" @click="$emit('edit', incident)">
        <Edit class="h-4 w-4 mr-2" />
        Editar
      </Button>
      <Button
        size="sm"
        variant="destructive"
        @click="$emit('delete', incident.id)"
      >
        <Trash class="h-4 w-4" />
      </Button>
    </div>
  </div>
</template>
