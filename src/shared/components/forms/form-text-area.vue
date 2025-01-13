<script setup lang="ts">
import { computed } from 'vue'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'

const props = defineProps<{
  id: string
  label: string
  placeholder?: string
  modelValue: string
  error?: string
  name?: string
}>()

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

const textareaValue = computed({
  get: () => props.modelValue,
  set: (value: string) => emit('update:modelValue', value),
})
</script>

<template>
  <div class="grid w-full gap-1.5">
    <Label :for="id">{{ label }}</Label>
    <Textarea
      :id="id"
      :name="name || id"
      v-model="textareaValue"
      :placeholder="placeholder"
      class="border-gray-500"
    />
    <p v-if="error" class="text-red-500 text-xs mt-1">{{ error }}</p>
  </div>
</template>