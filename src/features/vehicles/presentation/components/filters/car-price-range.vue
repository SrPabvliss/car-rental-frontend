<script setup lang="ts">
import { computed } from 'vue'

import { Input } from '@/components/ui/input'

const props = defineProps<{
  minPrice: string
  maxPrice: string
}>()

const emit = defineEmits<{
  'update:minPrice': [value: string]
  'update:maxPrice': [value: string]
}>()

const minPriceValue = computed({
  get: () => props.minPrice,
  set: (value: string) => emit('update:minPrice', value),
})

const maxPriceValue = computed({
  get: () => props.maxPrice,
  set: (value: string) => emit('update:maxPrice', value),
})
</script>

<template>
  <div class="space-y-2">
    <span class="text-sm font-medium">Rango de precios</span>
    <div class="flex gap-2">
      <Input
        type="number"
        v-model="minPriceValue"
        placeholder="Mínimo"
        min="0"
      />
      <Input
        type="number"
        v-model="maxPriceValue"
        placeholder="Máximo"
        min="0"
      />
    </div>
  </div>
</template>
