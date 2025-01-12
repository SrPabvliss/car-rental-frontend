<script setup lang="ts">
import { FormInput, FormSelect } from '@/shared/components/forms'
import { SlidersHorizontal, X } from 'lucide-vue-next'
import { computed } from 'vue'

import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'

import { useCarFilters } from '../../../composables/use-car-filters'
import type { ICarFilters } from '../../../interfaces/ICarFilters'
import CarPriceRange from './car-price-range.vue'

const props = defineProps<{
  modelValue: ICarFilters
}>()

const emit = defineEmits<{
  'update:modelValue': [filters: ICarFilters]
}>()

const {
  searchValue,
  selectConfigs,
  minPriceValue,
  maxPriceValue,
  clearFilters,
} = useCarFilters(props, emit)

const hasActiveFilters = computed(() => {
  return Boolean(
    searchValue.value ||
      props.modelValue.type ||
      props.modelValue.status ||
      props.modelValue.year ||
      props.modelValue.brand ||
      props.modelValue.minPrice ||
      props.modelValue.maxPrice ||
      props.modelValue.orderBy,
  )
})
</script>

<template>
  <div class="space-y-4">
    <div class="flex gap-2">
      <FormInput
        id="search"
        v-model="searchValue"
        placeholder="Buscar vehículos..."
        :icon="SlidersHorizontal"
      />

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
            <template v-for="config in selectConfigs" :key="config.key">
              <FormSelect
                :id="config.id as string"
                v-model="config.modelValue"
                :placeholder="config.placeholder"
                :options="config.options"
                :allLabel="config.allLabel"
                @update:modelValue="config.handler"
              />
            </template>

            <CarPriceRange
              v-model:minPrice="minPriceValue"
              v-model:maxPrice="maxPriceValue"
            />
          </div>
        </SheetContent>
      </Sheet>
    </div>
    <Button
      v-if="hasActiveFilters"
      variant="outline"
      class="lg:hidden w-full"
      @click="clearFilters"
    >
      <X class="w-4 h-4 mr-2" />
      Limpiar Filtros
    </Button>

    <div class="hidden lg:grid grid-cols-6 gap-4">
      <template v-for="config in selectConfigs" :key="config.key">
        <FormSelect
          :id="config.key"
          v-model="config.modelValue"
          :placeholder="config.placeholder"
          :options="config.options"
          :allLabel="config.allLabel"
          @update:modelValue="config.handler"
        />
      </template>

      <CarPriceRange
        v-model:minPrice="minPriceValue"
        v-model:maxPrice="maxPriceValue"
      />

      <Button
        v-if="hasActiveFilters"
        variant="outline"
        class="col-span-6"
        @click="clearFilters"
        :disabled="!hasActiveFilters"
      >
        <X class="w-4 h-4 mr-2" />
        Limpiar filtros
      </Button>
    </div>
  </div>
</template>
