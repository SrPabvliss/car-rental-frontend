<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'

defineProps<{
  imageUrl: string | null
  isLoading: boolean
}>()

const emit = defineEmits(['upload'])

const onUpload = () => {
  emit('upload')
}
</script>

<template>
  <div class="flex flex-col gap-4">
    <!-- Etiqueta -->
    <Label class="text-sm font-medium text-gray-700">Imagen del vehículo</Label>

    <!-- Contenedor Principal -->
    <div class="flex items-start gap-4">
      <!-- Contenedor de Imagen -->
      <div
        class="w-40 h-40 border border-gray-300 rounded-md flex items-center justify-center overflow-hidden"
      >
        <!-- Imagen Cargada -->
        <template v-if="imageUrl">
          <img
            :src="imageUrl"
            alt="Uploaded Image"
            class="w-full h-full object-cover"
          />
        </template>

        <!-- Placeholder (Sin Imagen) -->
        <template v-else>
          <span class="text-sm text-gray-500">No hay imagen</span>
        </template>
      </div>

      <!-- Botones -->
      <div class="flex flex-col gap-2">
        <!-- Botón de Subir Imagen -->
        <Button
          variant="default"
          @click="onUpload"
          :disabled="isLoading"
          class="w-full"
          type="button"
        >
          {{ imageUrl ? 'Cambiar Imagen' : 'Subir Imagen' }}
        </Button>

        <!-- Mensaje de Estado -->
        <p v-if="isLoading" class="text-sm text-blue-600 animate-pulse">
          Cargando imagen...
        </p>
      </div>
    </div>
  </div>
</template>
