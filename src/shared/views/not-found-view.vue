<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()
</script>

<template>
  <div class="flex items-center justify-center h-full">
    <div class="space-y-4 text-center">
      <h1 class="text-4xl font-bold">404</h1>
      <p class="text-lg">Página no encontrada</p>
      <Button @click="router.back">Volver al inicio</Button>
    </div>
  </div>
</template>
