<script setup lang="ts">
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

interface Props {
  modelValue: string | number
  placeholder: string
  options: { value: string; label: string }[]
  allLabel?: string
}

withDefaults(defineProps<Props>(), {
  allLabel: 'Todos',
})

defineEmits<{
  'update:modelValue': [value: string]
}>()
</script>

<template>
  <Select
    :model-value="modelValue.toString()"
    @update:model-value="value => $emit('update:modelValue', value)"
  >
    <SelectTrigger>
      <SelectValue :placeholder="placeholder" />
    </SelectTrigger>
    <SelectContent>
      <SelectItem value="all">{{ allLabel }}</SelectItem>
      <SelectItem
        v-for="option in options"
        :key="option.value"
        :value="option.value"
      >
        {{ option.label }}
      </SelectItem>
    </SelectContent>
  </Select>
</template>
