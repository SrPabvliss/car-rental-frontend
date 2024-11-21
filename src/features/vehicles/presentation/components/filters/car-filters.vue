<script setup lang="ts">
import { FormInput, FormSelect } from '@/shared/components/forms'
import { SlidersHorizontal } from 'lucide-vue-next'

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

const { searchValue, selectConfigs, minPriceValue, maxPriceValue } =
  useCarFilters(props, emit)
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
    </div>
  </div>
</template>
