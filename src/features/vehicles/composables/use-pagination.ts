import { computed } from 'vue'

import type { ICarFilters } from '../interfaces/ICarFilters'

interface PaginationProps {
  modelValue: ICarFilters
  totalItems: number
  itemsPerPage?: number
}

export function usePagination({
  modelValue,
  totalItems,
  itemsPerPage = 5,
}: PaginationProps) {
  const currentPage = computed(() => Number(modelValue.page))
  const totalPages = computed(() => Math.ceil(totalItems / itemsPerPage))

  const pages = computed(() => {
    const current = currentPage.value
    const total = totalPages.value
    const delta = 1
    const range: (number | string)[] = []

    range.push(1)

    for (let i = current - delta; i <= current + delta; i++) {
      if (i > 1 && i < total) {
        range.push(i)
      }
    }

    if (total > 1) {
      range.push(total)
    }

    const final: (number | string)[] = []
    let prev: number | null = null

    for (const i of range) {
      if (prev !== null) {
        if (typeof i === 'number' && i > prev + 1) {
          final.push('...')
        }
      }
      final.push(i)
      if (typeof i === 'number') prev = i
    }

    return final
  })

  const stats = computed(() => {
    const start = (currentPage.value - 1) * itemsPerPage + 1
    const end = Math.min(start + itemsPerPage - 1, totalItems)
    return `Mostrando ${start} a ${end} de ${totalItems} vehículos`
  })

  const isFirstPage = computed(() => currentPage.value === 1)
  const isLastPage = computed(() => currentPage.value === totalPages.value)

  return {
    currentPage,
    totalPages,
    pages,
    stats,
    isFirstPage,
    isLastPage,
    itemsPerPage,
  }
}
