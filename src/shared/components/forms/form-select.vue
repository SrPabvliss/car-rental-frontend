<script setup lang="ts">
defineProps<{
  id: string
  modelValue: string | number
  placeholder?: string
  options: { value: string | number; label: string }[]
  allLabel?: string
  error?: string | null
}>()

defineEmits(['update:modelValue'])
</script>

<template>
  <div class="grid w-full gap-1.5">
    <label :for="id" class="text-sm font-medium">{{ placeholder }}</label>
    <select
      :id="id"
      class="custom-select"
      :value="modelValue"
      @change="
        $emit('update:modelValue', ($event.target as HTMLSelectElement).value)
      "
    >
      <option value="all">{{ allLabel || 'Todos' }}</option>
      <option
        v-for="option in options"
        :key="option.value"
        :value="option.value"
      >
        {{ option.label }}
      </option>
    </select>
    <p v-if="error" class="text-red-500 text-xs mt-1">{{ error }}</p>
  </div>
</template>

<style scoped>
@import '@/assets/select.css';
</style>
