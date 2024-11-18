import { computed, unref, type Ref } from 'vue'

import type { ICarFilters } from '../interfaces/ICarFilters'

interface PaginationProps {
  modelValue: Ref<ICarFilters> | ICarFilters
  totalItems: Ref<number> | number
  itemsPerPage?: number
}

export function usePagination({
  modelValue,
  totalItems,
  itemsPerPage = 6,
}: PaginationProps) {
  const currentPage = computed(() => {
    const filters = unref(modelValue)
    return Number(filters.page)
  })

  const totalItemsValue = computed(() => unref(totalItems))

  const totalPages = computed(() => {
    const pages = Math.ceil(totalItemsValue.value / itemsPerPage)
    return Math.max(1, pages)
  })

  const pages = computed(() => {
    const range: (number | string)[] = []
    const total = totalPages.value
    const current = currentPage.value

    for (let i = 0; i < total; i++) {
      if (i === 0 || i === total - 1 || Math.abs(current - i) <= 1) {
        range.push(i)
      } else if (i === current - 2 || i === current + 2) {
        range.push('...')
      }
    }

    return [...new Set(range)]
  })

  const stats = computed(() => {
    if (totalItemsValue.value <= 0) return 'No hay vehículos disponibles'

    const start = currentPage.value * itemsPerPage + 1
    const end = Math.min(start + itemsPerPage - 1, totalItemsValue.value)
    return `Mostrando ${start} a ${end} de ${totalItemsValue.value} vehículos`
  })

  return {
    currentPage,
    totalPages,
    pages,
    stats,
    itemsPerPage,
  }
}
