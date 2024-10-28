<script setup lang="ts">
import { Search, SlidersHorizontal } from 'lucide-vue-next'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import type {
  ICarFilters,
  OrderByOption,
  OrderByValue,
} from '../../interfaces/ICarFilters'
import type { CarStatus, CarType } from '../../interfaces/ICar'
import { computed } from 'vue'

const props = defineProps<{
  modelValue: ICarFilters
}>()

const emit = defineEmits<{
  'update:modelValue': [filters: ICarFilters]
}>()

const ALL_VALUE = 'all'

const searchValue = computed({
  get: () => props.modelValue.search,
  set: (value: string) => updateFilter('search', value),
})

const brands: string[] = [
  'Toyota',
  'Honda',
  'Ford',
  'Chevrolet',
  'Volkswagen',
  'BMW',
  'Mercedes-Benz',
  'Audi',
  'Nissan',
  'Hyundai',
].sort()

const types: CarType[] = ['sedan', 'suv', 'hatchback', 'pickup', 'van', 'coupe']
const statuses: CarStatus[] = [
  'available',
  'maintenance',
  'rented',
  'unavailable',
]
const years: number[] = Array.from({ length: 5 }, (_, i) => 2024 - i)
const orderByOptions: OrderByOption[] = [
  { value: 'price_asc', label: 'Precio: Menor a Mayor' },
  { value: 'price_desc', label: 'Precio: Mayor a Menor' },
  { value: 'year_desc', label: 'Año: Más reciente' },
  { value: 'year_asc', label: 'Año: Más antiguo' },
]

// Computed values para los selects
const selectedBrand = computed(() => props.modelValue.brand || ALL_VALUE)
const selectedType = computed(() => props.modelValue.type || ALL_VALUE)
const selectedStatus = computed(() => props.modelValue.status || ALL_VALUE)
const selectedYear = computed(() =>
  props.modelValue.year ? props.modelValue.year.toString() : ALL_VALUE,
)
const selectedOrderBy = computed(() => props.modelValue.orderBy || ALL_VALUE)

// Computed values para los precios con two-way binding
const minPriceValue = computed({
  get: () => props.modelValue.minPrice?.toString() || '',
  set: (value: string) => {
    const numberValue = value === '' ? '' : Number(value)
    updateFilter('minPrice', numberValue)
  },
})

const maxPriceValue = computed({
  get: () => props.modelValue.maxPrice?.toString() || '',
  set: (value: string) => {
    const numberValue = value === '' ? '' : Number(value)
    updateFilter('maxPrice', numberValue)
  },
})

const updateFilter = <K extends keyof ICarFilters>(
  key: K,
  value: ICarFilters[K],
) => {
  emit('update:modelValue', {
    ...props.modelValue,
    page: 1,
    [key]: value,
  })
}

const handleBrandSelect = (value: string) => {
  updateFilter('brand', value === ALL_VALUE ? '' : value)
}

const handleTypeSelect = (value: string) => {
  updateFilter('type', value === ALL_VALUE ? '' : (value as CarType))
}

const handleStatusSelect = (value: string) => {
  updateFilter('status', value === ALL_VALUE ? '' : (value as CarStatus))
}

const handleYearSelect = (value: string) => {
  updateFilter('year', value === ALL_VALUE ? '' : Number(value))
}

const handleOrderBySelect = (value: string) => {
  updateFilter('orderBy', value === ALL_VALUE ? '' : (value as OrderByValue))
}
</script>

<template>
  <div class="space-y-4">
    <div class="flex gap-2">
      <div class="relative flex-1">
        <Search
          class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5"
        />
        <Input
          v-model="searchValue"
          placeholder="Buscar vehículos..."
          class="pl-10"
        />
      </div>

      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" class="lg:hidden">
            <SlidersHorizontal class="w-4 h-4 mr-2" />
            Filtros
          </Button>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Filtros</SheetTitle>
            <SheetDescription>
              Ajusta los filtros para encontrar el vehículo perfecto
            </SheetDescription>
          </SheetHeader>
          <div class="space-y-4 mt-4">
            <Select
              :model-value="selectedBrand"
              @update:model-value="handleBrandSelect"
            >
              <SelectTrigger>
                <SelectValue placeholder="Marca" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem :value="ALL_VALUE">Todas las marcas</SelectItem>
                <SelectItem v-for="brand in brands" :key="brand" :value="brand">
                  {{ brand }}
                </SelectItem>
              </SelectContent>
            </Select>

            <Select
              :model-value="selectedType"
              @update:model-value="handleTypeSelect"
            >
              <SelectTrigger>
                <SelectValue placeholder="Tipo de vehículo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem :value="ALL_VALUE">Todos los tipos</SelectItem>
                <SelectItem v-for="type in types" :key="type" :value="type">
                  {{ type.charAt(0).toUpperCase() + type.slice(1) }}
                </SelectItem>
              </SelectContent>
            </Select>

            <Select
              :model-value="selectedStatus"
              @update:model-value="handleStatusSelect"
            >
              <SelectTrigger>
                <SelectValue placeholder="Estado" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem :value="ALL_VALUE">Todos los estados</SelectItem>
                <SelectItem
                  v-for="status in statuses"
                  :key="status"
                  :value="status"
                >
                  {{ status.charAt(0).toUpperCase() + status.slice(1) }}
                </SelectItem>
              </SelectContent>
            </Select>

            <Select
              :model-value="selectedYear"
              @update:model-value="handleYearSelect"
            >
              <SelectTrigger>
                <SelectValue placeholder="Año" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem :value="ALL_VALUE">Todos los años</SelectItem>
                <SelectItem
                  v-for="year in years"
                  :key="year"
                  :value="year.toString()"
                >
                  {{ year }}
                </SelectItem>
              </SelectContent>
            </Select>

            <div class="space-y-2">
              <span class="text-sm font-medium">Rango de precios</span>
              <div class="grid grid-cols-2 gap-2">
                <Input
                  type="number"
                  v-model="minPriceValue"
                  placeholder="Mínimo"
                  min="0"
                />
                <Input
                  type="number"
                  v-model="maxPriceValue"
                  placeholder="Máximo"
                  min="0"
                />
              </div>
            </div>

            <Select
              :model-value="selectedOrderBy"
              @update:model-value="handleOrderBySelect"
            >
              <SelectTrigger>
                <SelectValue placeholder="Ordenar por" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem :value="ALL_VALUE">Relevancia</SelectItem>
                <SelectItem
                  v-for="option in orderByOptions"
                  :key="option.value"
                  :value="option.value"
                >
                  {{ option.label }}
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </SheetContent>
      </Sheet>
    </div>

    <div class="hidden lg:grid grid-cols-6 gap-4">
      <Select
        :model-value="selectedBrand"
        @update:model-value="handleBrandSelect"
      >
        <SelectTrigger>
          <SelectValue placeholder="Marca" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem :value="ALL_VALUE">Todas las marcas</SelectItem>
          <SelectItem v-for="brand in brands" :key="brand" :value="brand">
            {{ brand }}
          </SelectItem>
        </SelectContent>
      </Select>

      <Select
        :model-value="selectedType"
        @update:model-value="handleTypeSelect"
      >
        <SelectTrigger>
          <SelectValue placeholder="Tipo de vehículo" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem :value="ALL_VALUE">Todos los tipos</SelectItem>
          <SelectItem v-for="type in types" :key="type" :value="type">
            {{ type.charAt(0).toUpperCase() + type.slice(1) }}
          </SelectItem>
        </SelectContent>
      </Select>

      <Select
        :model-value="selectedStatus"
        @update:model-value="handleStatusSelect"
      >
        <SelectTrigger>
          <SelectValue placeholder="Estado" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem :value="ALL_VALUE">Todos los estados</SelectItem>
          <SelectItem v-for="status in statuses" :key="status" :value="status">
            {{ status.charAt(0).toUpperCase() + status.slice(1) }}
          </SelectItem>
        </SelectContent>
      </Select>

      <Select
        :model-value="selectedYear"
        @update:model-value="handleYearSelect"
      >
        <SelectTrigger>
          <SelectValue placeholder="Año" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem :value="ALL_VALUE">Todos los años</SelectItem>
          <SelectItem
            v-for="year in years"
            :key="year"
            :value="year.toString()"
          >
            {{ year }}
          </SelectItem>
        </SelectContent>
      </Select>

      <div class="space-y-2">
        <span class="text-sm font-medium">Rango de precios</span>
        <div class="flex gap-2">
          <Input
            type="number"
            v-model="minPriceValue"
            placeholder="Mínimo"
            min="0"
          />
          <Input
            type="number"
            v-model="maxPriceValue"
            placeholder="Máximo"
            min="0"
          />
        </div>
      </div>

      <Select
        :model-value="selectedOrderBy"
        @update:model-value="handleOrderBySelect"
      >
        <SelectTrigger>
          <SelectValue placeholder="Ordenar por" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem :value="ALL_VALUE">Relevancia</SelectItem>
          <SelectItem
            v-for="option in orderByOptions"
            :key="option.value"
            :value="option.value"
          >
            {{ option.label }}
          </SelectItem>
        </SelectContent>
      </Select>
    </div>
  </div>
</template>
