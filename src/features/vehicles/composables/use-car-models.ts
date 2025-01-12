// composables/use-car-models.ts
import { useDebounceFn } from '@vueuse/core'
import { ref, watch } from 'vue'

import { VehicleModelsService } from '../services/models-datasoruce'

export function useCarModels(initialMake?: string) {
  const searchTerm = ref('')
  const selectedMake = ref(initialMake || '')
  const models = ref<string[]>([])
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  const loadModels = useDebounceFn(async () => {
    if (!selectedMake.value) {
      models.value = []
      return
    }

    isLoading.value = true
    error.value = null

    try {
      const allModels = await VehicleModelsService.getModelsForMake(
        selectedMake.value,
      )
      models.value = allModels
    } catch {
      error.value = 'Error al cargar los modelos'
      models.value = []
    } finally {
      isLoading.value = false
    }
  }, 300)

  // Cargar modelos cuando cambie la marca
  watch(selectedMake, () => {
    searchTerm.value = ''
    loadModels()
  })

  // Cargar modelos iniciales si hay una marca inicial
  if (initialMake) {
    loadModels()
  }

  return {
    searchTerm,
    selectedMake,
    models,
    isLoading,
    error,
    setMake: (make: string) => {
      selectedMake.value = make
    },
  }
}
