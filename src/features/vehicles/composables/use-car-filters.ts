import { useDebounceFn } from '@vueuse/core'
import { computed } from 'vue'

import {
  CAR_BRANDS,
  CAR_TYPES,
  CAR_STATUSES,
  YEARS,
  ORDER_BY_OPTIONS,
  createFilterSelectConfigs,
} from '../constants'
import type { CarStatus, CarType } from '../interfaces/ICar'
import type { ICarFilters, OrderByValue } from '../interfaces/ICarFilters'

export const ALL_VALUE = 'all'

export function useCarFilters(props: { modelValue: ICarFilters }, emit: any) {
  const selectedBrand = computed(() => props.modelValue.brand || ALL_VALUE)
  const selectedType = computed(() => props.modelValue.type || ALL_VALUE)
  const selectedStatus = computed(() => props.modelValue.status || ALL_VALUE)
  const selectedYear = computed(() =>
    props.modelValue.year ? props.modelValue.year.toString() : ALL_VALUE,
  )

  const updateFilter = <K extends keyof ICarFilters>(
    key: K,
    value: ICarFilters[K],
  ) => {
    emit('update:modelValue', {
      ...props.modelValue,
      page: 0,
      [key]: value === 'all' ? '' : value,
    })
  }

  const debouncedUpdateFilter = useDebounceFn(
    <K extends keyof ICarFilters>(key: K, value: ICarFilters[K]) => {
      emit('update:modelValue', {
        ...props.modelValue,
        page: 0,
        [key]: value === 'all' ? '' : value,
      })
    },
    300,
  )

  const selectedOrderBy = computed(() => props.modelValue.orderBy || ALL_VALUE)

  const searchValue = computed({
    get: () => props.modelValue.search,
    set: (value: string) => debouncedUpdateFilter('search', value),
  })

  const minPriceValue = computed({
    get: () => props.modelValue.minPrice?.toString() || '',
    set: (value: string) => {
      const numberValue = value === '' ? '' : Number(value)
      debouncedUpdateFilter('minPrice', numberValue)
    },
  })

  const maxPriceValue = computed({
    get: () => props.modelValue.maxPrice?.toString() || '',
    set: (value: string) => {
      const numberValue = value === '' ? '' : Number(value)
      debouncedUpdateFilter('maxPrice', numberValue)
    },
  })

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

  const selectConfigs = computed(() =>
    createFilterSelectConfigs(
      {
        brand: selectedBrand.value,
        type: selectedType.value,
        status: selectedStatus.value,
        year: selectedYear.value,
        orderBy: selectedOrderBy.value,
      },
      {
        handleBrandSelect,
        handleTypeSelect,
        handleStatusSelect,
        handleYearSelect,
        handleOrderBySelect,
      },
    ),
  )

  return {
    // Constants
    ALL_VALUE,

    // Data
    brands: CAR_BRANDS,
    types: CAR_TYPES,
    statuses: CAR_STATUSES,
    years: YEARS,
    orderByOptions: ORDER_BY_OPTIONS,

    // Computed
    searchValue,
    selectedBrand,
    selectedType,
    selectedStatus,
    selectedYear,
    selectedOrderBy,
    minPriceValue,
    maxPriceValue,
    selectConfigs,

    // Methods
    handleBrandSelect,
    handleTypeSelect,
    handleStatusSelect,
    handleYearSelect,
    handleOrderBySelect,
  }
}
