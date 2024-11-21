<script setup lang="ts">
import { computed, type Component } from 'vue'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

const props = defineProps<{
  id: string
  label?: string
  type?: string
  modelValue: string | number
  placeholder?: string
  icon?: Component
  error?: string | null
}>()

const emit = defineEmits<{
  'update:modelValue': [value: string | number]
}>()

const inputValue = computed({
  get: () => props.modelValue,
  set: (value: string | number) => emit('update:modelValue', value),
})
</script>

<template>
  <div class="grid w-full gap-1.5">
    <Label v-if="label" :for="id">{{ label }}</Label>

    <div class="relative">
      <component
        v-if="icon"
        :is="icon"
        class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5"
      />
      <Input
        :id="id"
        :type="type || 'text'"
        v-model="inputValue"
        :placeholder="placeholder || ''"
        :class="['border-gray-500', { 'pl-10': icon }]" 
      />
    </div>

    <p v-if="error" class="text-red-500 text-xs mt-1">{{ error }}</p>
  </div>
</template>
