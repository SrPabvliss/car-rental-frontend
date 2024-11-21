<script setup lang="ts">
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'

defineProps<{
  id: string
  label: string
  placeholder?: string
  modelValue: string
  error?: string
}>()

defineEmits(['update:modelValue'])
</script>

<template>
  <div class="grid w-full gap-1.5">
    <Label :for="id">{{ label }}</Label>
    <Textarea
      :id="id"
      :placeholder="placeholder"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
    />
    <p v-if="error" class="text-red-500 text-xs mt-1">{{ error }}</p>
  </div>
</template>
