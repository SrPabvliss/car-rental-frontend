<script setup lang="ts">
import { useRouter } from 'vue-router'

import { Button } from '@/components/ui/button' // Asegúrate de importar tu componente Button

const router = useRouter()

const navigateToCars = () => {
  router.push({ name: 'cars' })
}
</script>

<template>
  <div
    class="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900"
  >
    <div
      class="space-y-6 text-center p-8 bg-white dark:bg-gray-800 rounded-lg shadow-md"
    >
      <h1 class="text-7xl font-bold text-red-600">403</h1>
      <p class="text-lg text-gray-600 dark:text-gray-300">
        No tienes permisos para acceder a esta página
      </p>
      <Button class="mt-4" variant="outline" @click="navigateToCars">
        Volver al inicio
      </Button>
    </div>
  </div>
</template>

<style scoped>
h1 {
  animation: bounceIn 1s ease-out;
}

@keyframes bounceIn {
  0% {
    opacity: 0;
    transform: scale(0.9);
  }
  50% {
    opacity: 0.5;
    transform: scale(1.05);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}
</style>
