<template>
  <div class="spinner" :class="sizeClass"></div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  size?: 'small' | 'medium' | 'large'
}

const props = defineProps<Props>()

const sizeClass = computed(() => {
  switch (props.size) {
    case 'small':
      return 'w-4 h-4'
    case 'large':
      return 'w-8 h-8'
    default:
      return 'w-6 h-6'
  }
})
</script>

<style scoped>
.spinner {
  border: 2px solid transparent;
  border-top-color: currentColor;
  border-radius: 50%;
  animation: spin 0.6s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
