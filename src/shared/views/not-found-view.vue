<script setup lang="ts">
import { useRouter } from 'vue-router'

import { Button } from '@/components/ui/button' // Asegúrate de tener este componente

const router = useRouter()

const navigateToCars = () => {
  router.push({ name: 'cars' })
}
</script>

<template>
  <div
    class="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900"
  >
    <div
      class="space-y-6 text-center p-8 bg-white dark:bg-gray-800 rounded-lg shadow-lg"
    >
      <h1 class="text-8xl font-extrabold text-blue-600">404</h1>
      <p class="text-xl text-gray-700 dark:text-gray-300">
        Página no encontrada
      </p>
      <p class="text-sm text-gray-500 dark:text-gray-400">
        Lo sentimos, pero no pudimos encontrar la página que buscas.
      </p>
      <Button class="mt-4" variant="outline" @click="navigateToCars">
        Volver al inicio
      </Button>
    </div>
  </div>
</template>

<style scoped>
h1 {
  animation: fadeIn 1s ease-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
