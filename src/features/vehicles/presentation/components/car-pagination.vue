<script setup lang="ts">
import { Button } from '@/components/ui/button'
import {
  ChevronFirst,
  ChevronLast,
  ChevronLeft,
  ChevronRight,
} from 'lucide-vue-next'
import type { ICarFilters } from '../../interfaces/ICarFilters'
import { usePagination } from '../../composables/use-pagination'
import { watch, ref, computed } from 'vue'

interface Props {
  modelValue: ICarFilters
  totalItems: number
}

const props = withDefaults(defineProps<Props>(), {
  totalItems: 0,
})

const emit = defineEmits<{
  'update:modelValue': [filters: ICarFilters]
}>()

const currentPage = ref(props.modelValue.page)

const { totalPages, pages, stats, itemsPerPage } = usePagination({
  modelValue: { ...props.modelValue, page: currentPage.value },
  totalItems: props.totalItems,
})

const isFirstPage = computed(() => currentPage.value === 1)
const isLastPage = computed(() => currentPage.value === totalPages.value)

const updatePage = (page: number) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page
    emit('update:modelValue', {
      ...props.modelValue,
      page,
      perPage: itemsPerPage,
    })
  }
}

watch(
  () => props.modelValue.page,
  newPage => {
    if (newPage !== currentPage.value) {
      currentPage.value = newPage
    }
  },
)
</script>

<template>
  <div class="flex flex-col items-center gap-2">
    <div class="flex items-center gap-1">
      <Button
        variant="outline"
        size="icon"
        class="h-8 w-8"
        :disabled="isFirstPage"
        @click="updatePage(1)"
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

      <template v-for="page in pages" :key="page">
        <Button
          v-if="typeof page === 'number'"
          :variant="page === currentPage ? 'default' : 'outline'"
          class="h-8 w-8"
          @click="updatePage(page)"
        >
          {{ page }}
        </Button>
        <div v-else class="px-2">{{ page }}</div>
      </template>

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
        @click="updatePage(totalPages)"
      >
        <ChevronLast class="h-4 w-4" />
      </Button>
    </div>

    <p class="text-sm text-muted-foreground">
      {{ stats }}
    </p>
  </div>
</template>
