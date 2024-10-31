<script setup lang="ts">
import { Search } from 'lucide-vue-next'
import { computed } from 'vue'

import { Input } from '@/components/ui/input'

const props = defineProps<{
  modelValue: string
}>()

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

const inputValue = computed({
  get: () => props.modelValue,
  set: (value: string) => emit('update:modelValue', value),
})
</script>

<template>
  <div class="relative flex-1">
    <Search
      class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5"
    />
    <Input
      v-model="inputValue"
      placeholder="Buscar vehículos..."
      class="pl-10"
    />
  </div>
</template>
