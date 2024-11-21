<script setup lang="ts">
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'

defineProps<{
  id: string
  label: string
  modelValue: boolean
  description?: string
}>()

defineEmits(['update:modelValue'])
</script>

<template>
  <div class="items-top flex gap-x-2">
    <Checkbox
      :id="id"
      :checked="modelValue"
      @change="$emit('update:modelValue', $event.target.checked)"
    />
    <div class="grid gap-1.5 leading-none">
      <Label :for="id">{{ label }}</Label>
      <p v-if="description" class="text-sm text-muted-foreground">
        {{ description }}
      </p>
    </div>
  </div>
</template>
