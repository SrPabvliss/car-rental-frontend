<script setup lang="ts">
interface Props {
  modelValue: string | number
  placeholder?: string
  options: { value: string; label: string }[]
  allLabel?: string
}

withDefaults(defineProps<Props>(), {
  allLabel: 'Todos',
  placeholder: 'Selecciona una opción',
})

defineEmits<{
  'update:modelValue': [value: string]
}>()
</script>

<template>
  <div class="custom-select-wrapper">
    <select
      class="custom-select"
      :value="modelValue"
      @change="
        $emit('update:modelValue', ($event.target as HTMLSelectElement).value)
      "
      :aria-label="placeholder"
    >
      <option value="all">{{ allLabel }}</option>
      <option
        v-for="option in options"
        :key="option.value"
        :value="option.value"
      >
        {{ option.label }}
      </option>
    </select>
  </div>
</template>

<style scoped>
@import '@/assets/select.css';
</style>
