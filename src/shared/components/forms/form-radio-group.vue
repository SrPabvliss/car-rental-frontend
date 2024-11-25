<script setup lang="ts">
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'

defineProps<{
  options: { value: string; label: string }[]
  modelValue: string
  id: string
}>()

defineEmits(['update:modelValue'])
</script>

<template>
  <RadioGroup :value="modelValue" @change="$emit('update:modelValue', $event)">
    <div
      v-for="option in options"
      :key="option.value"
      class="flex items-center space-x-2"
    >
      <RadioGroupItem :id="`${id}-${option.value}`" :value="option.value" />
      <Label :for="`${id}-${option.value}`">{{ option.label }}</Label>
    </div>
  </RadioGroup>
</template>
