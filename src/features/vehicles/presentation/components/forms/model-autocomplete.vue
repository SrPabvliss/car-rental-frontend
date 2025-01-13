# model-autocomplete.vue
<script setup lang="ts">
import { Check, ChevronsUpDown, Loader2 } from 'lucide-vue-next'
import { ref, computed } from 'vue'

import { Button } from '@/components/ui/button'
import { Command, CommandInput } from '@/components/ui/command'
import { Label } from '@/components/ui/label'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'

interface Props {
  label?: string
  placeholder?: string
  noResultsMessage?: string
  disabled?: boolean
  error?: string
  modelValue: string
  models: string[]
  isLoading?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  placeholder: 'Seleccionar modelo...',
  noResultsMessage: 'No se encontraron modelos',
  disabled: false,
  isLoading: false,
})

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

const open = ref(false)
const searchQuery = ref('')

const handleSelect = (selectedModel: string) => {
  emit('update:modelValue', selectedModel)
  open.value = false
  searchQuery.value = ''
}

const handleSearch = (query: string) => {
  searchQuery.value = query
}

const filteredModels = computed(() => {
  if (!searchQuery.value) return props.models

  return props.models.filter(model =>
    model.toLowerCase().includes(searchQuery.value.toLowerCase()),
  )
})
</script>

<template>
  <div class="grid w-full gap-1.5">
    <Label v-if="label">{{ label }}</Label>
    <Popover v-model:open="open">
      <PopoverTrigger as-child>
        <Button
          variant="outline"
          role="combobox"
          :aria-expanded="open"
          :disabled="disabled"
          :class="[
            'w-full justify-between',
            disabled && 'opacity-50 cursor-not-allowed',
          ]"
        >
          {{ modelValue || placeholder }}
          <Loader2 v-if="isLoading" class="ml-2 h-4 w-4 animate-spin" />
          <ChevronsUpDown v-else class="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent class="w-full p-0">
        <Command :class="['rounded-lg border shadow-md']">
          <div class="flex items-center border-b px-3">
            <CommandInput
              placeholder="Buscar modelo..."
              :value="searchQuery"
              @input="e => handleSearch((e.target as HTMLInputElement).value)"
              class="border-0 focus:ring-0 h-9"
            />
          </div>
          <div class="relative">
            <div
              v-if="filteredModels.length === 0"
              class="py-6 text-center text-sm"
            >
              {{ noResultsMessage }}
            </div>
            <div v-else class="max-h-[200px] overflow-auto py-2">
              <div
                v-for="model in filteredModels"
                :key="model"
                :class="[
                  'relative flex w-full cursor-pointer select-none items-center py-1.5 px-3 text-sm outline-none hover:bg-accent hover:text-accent-foreground',
                  modelValue === model && 'bg-accent text-accent-foreground',
                ]"
                @click="handleSelect(model)"
              >
                <Check
                  :class="[
                    'mr-2 h-4 w-4',
                    modelValue === model ? 'opacity-100' : 'opacity-0',
                  ]"
                />
                {{ model }}
              </div>
            </div>
          </div>
        </Command>
      </PopoverContent>
    </Popover>
    <p v-if="error" class="text-sm text-red-500">{{ error }}</p>
  </div>
</template>
