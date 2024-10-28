<script setup lang="ts">
import { Button } from '@/components/ui/button'
import {
  Pagination,
  PaginationEllipsis,
  PaginationFirst,
  PaginationLast,
  PaginationList,
  PaginationListItem,
  PaginationNext,
  PaginationPrev,
} from '@/components/ui/pagination'
import { computed } from 'vue'
import type { ICarFilters } from '../../interfaces/ICarFilters'

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

const ITEMS_PER_PAGE = 5

const currentPage = computed(() => props.modelValue.page)

const updatePage = (page: number) => {
  emit('update:modelValue', {
    ...props.modelValue,
    page,
    perPage: ITEMS_PER_PAGE,
  })
}

const stats = computed(() => {
  const start = (currentPage.value - 1) * ITEMS_PER_PAGE + 1
  const end = Math.min(start + ITEMS_PER_PAGE - 1, props.totalItems)
  return `Mostrando ${start} a ${end} de ${props.totalItems} vehículos`
})

const totalPages = computed(() => Math.ceil(props.totalItems / ITEMS_PER_PAGE))

const handlePageChange = (newPage: number) => {
  if (newPage >= 1 && newPage <= totalPages.value) {
    updatePage(newPage)
  }
}
</script>

<template>
  <div class="flex flex-col gap-2 items-center">
    <Pagination
      v-slot="{ page }"
      :total="totalPages"
      :sibling-count="1"
      show-edges
      :default-page="currentPage"
      :page="currentPage"
      @update:page="handlePageChange"
    >
      <PaginationList v-slot="{ items }" class="flex items-center gap-1">
        <PaginationFirst @click="handlePageChange(1)" />
        <PaginationPrev @click="handlePageChange(currentPage - 1)" />
        <template v-for="(item, index) in items">
          <PaginationListItem
            v-if="item.type === 'page'"
            :key="index"
            :value="item.value"
            as-child
          >
            <Button
              class="w-10 h-10 p-0"
              :variant="item.value === page ? 'default' : 'outline'"
              @click="handlePageChange(item.value)"
            >
              {{ item.value }}
            </Button>
          </PaginationListItem>
          <PaginationEllipsis v-else :key="item.type" :index="index" />
        </template>
        <PaginationNext @click="handlePageChange(currentPage + 1)" />
        <PaginationLast @click="handlePageChange(totalPages)" />
      </PaginationList>
    </Pagination>
    <p class="text-sm text-muted-foreground">
      {{ stats }}
    </p>
  </div>
</template>
