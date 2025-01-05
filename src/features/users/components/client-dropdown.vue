<script setup lang="ts">
import { Check, ChevronsUpDown, Search } from 'lucide-vue-next'
import { computed, ref, watch } from 'vue'

import { Button } from '@/components/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from '@/components/ui/command'
import { Input } from '@/components/ui/input'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'

import { useClients } from '../composables/use-clients'
import type { IUser } from '../interfaces/IUser'

const props = defineProps<{
  modelValue?: number
  disabled?: boolean
}>()

const { clients } = useClients()

const emit = defineEmits<{
  'update:modelValue': [value: number]
}>()

const open = ref(false)
const selectedValue = ref<number | undefined>(props.modelValue)
const searchQuery = ref('')

watch(
  () => props.modelValue,
  newValue => {
    selectedValue.value = newValue
  },
)

const getClientFullName = (client: IUser) => `${client.name} ${client.lastName}`

const selectedClient = computed(() =>
  clients.value.find(client => client.id === selectedValue.value),
)

const filteredClients = computed(() => {
  const query = searchQuery.value.toLowerCase()

  const filtered = clients.value.filter(client =>
    getClientFullName(client).toLowerCase().includes(query),
  )

  return filtered
})

const handleSelect = (clientId: number) => {
  selectedValue.value = clientId
  emit('update:modelValue', clientId)
  open.value = false
}
</script>

<template>
  <Popover v-model:open="open">
    <PopoverTrigger as-child>
      <Button
        variant="outline"
        role="combobox"
        :aria-expanded="open"
        class="w-[200px] justify-between"
        :disabled="disabled"
        data-testid="client-dropdown-trigger"
      >
        {{
          selectedClient
            ? getClientFullName(selectedClient)
            : 'Seleccionar cliente...'
        }}
        <ChevronsUpDown class="ml-2 h-4 w-4 shrink-0 opacity-50" />
      </Button>
    </PopoverTrigger>
    <PopoverContent class="w-[200px] p-0">
      <Command>
        <div class="flex items-center border-b px-3">
          <Search class="mr-2 h-4 w-4 shrink-0 opacity-50" />
          <Input
            v-model="searchQuery"
            placeholder="Buscar cliente..."
            class="h-9 border-0 focus-visible:ring-0"
            data-testid="client-search-input"
          />
        </div>
        <CommandEmpty v-if="!filteredClients.length"
          >No se encontraron clientes.</CommandEmpty
        >
        <CommandGroup>
          <CommandItem
            v-for="client in filteredClients"
            :key="client.id"
            :value="getClientFullName(client)"
            @select="() => handleSelect(client.id)"
            :data-testid="`client-option-${client.id}`"
          >
            <Check
              class="mr-2 h-4 w-4"
              :class="selectedValue === client.id ? 'opacity-100' : 'opacity-0'"
            />
            {{ getClientFullName(client) }}
          </CommandItem>
        </CommandGroup>
      </Command>
    </PopoverContent>
  </Popover>
</template>
