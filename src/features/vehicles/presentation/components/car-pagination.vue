<script setup lang="ts">
import {
  ChevronFirst,
  ChevronLast,
  ChevronLeft,
  ChevronRight,
} from 'lucide-vue-next'
import { computed } from 'vue'

import Button from '@/components/ui/button/Button.vue'

import { usePagination } from '../../composables/use-pagination'
import type { ICarFilters } from '../../interfaces/ICarFilters'

interface Props {
  modelValue: ICarFilters
  totalItems: number
}

const props = defineProps<Props>()

const emit = defineEmits<{
  'update:modelValue': [filters: ICarFilters]
}>()

const propsAsRefs = { 
  modelValue: computed({
    get: () => props.modelValue,
    set: value => emit('update:modelValue', value),
  }),
  totalItems: computed(() => props.totalItems),
}

const { currentPage, totalPages, pages, stats } = usePagination({
  modelValue: propsAsRefs.modelValue,
  totalItems: propsAsRefs.totalItems,
})

const updatePage = (page: number) => {
  if (page >= 0 && page < totalPages.value) {
    emit('update:modelValue', {
      ...props.modelValue,
      page,
    })
  }
}

const isFirstPage = computed(() => currentPage.value === 0)
const isLastPage = computed(() => currentPage.value === totalPages.value - 1)
</script>

<template>
  <div class="flex flex-col items-center gap-2">
    <div class="flex items-center gap-1">
      <Button
        variant="outline"
        size="icon"
        class="h-8 w-8"
        :disabled="isFirstPage"
        @click="updatePage(0)"
      >
        <ChevronFirst class="h-4 w-4" />
      </Button>

      <Button
        variant="outline"
        size="icon"
        class="h-8 w-8"
        :disabled="isFirstPage"
        @click="updatePage(currentPage - 1)"
      >
        <ChevronLeft class="h-4 w-4" />
      </Button>

      <Button
        v-for="page in pages"
        :key="page"
        :variant="page === currentPage ? 'default' : 'outline'"
        class="h-8 w-8"
        @click="updatePage(Number(page))"
        :disabled="typeof page !== 'number'"
      >
        {{ typeof page === 'number' ? page + 1 : page }}
      </Button>

      <Button
        variant="outline"
        size="icon"
        class="h-8 w-8"
        :disabled="isLastPage"
        @click="updatePage(currentPage + 1)"
      >
        <ChevronRight class="h-4 w-4" />
      </Button>

      <Button
        variant="outline"
        size="icon"
        class="h-8 w-8"
        :disabled="isLastPage"
        @click="updatePage(totalPages - 1)"
      >
        <ChevronLast class="h-4 w-4" />
      </Button>
    </div>

    <p class="text-sm text-muted-foreground">
      {{ stats }}
    </p>
  </div>
</template>
