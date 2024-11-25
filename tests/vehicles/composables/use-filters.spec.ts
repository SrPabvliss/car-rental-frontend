import { describe, it, expect, vi } from 'vitest'

import { useCarFilters } from '../../../src/features/vehicles/composables/use-car-filters'
import { CarType } from '../../../src/features/vehicles/interfaces/ICar'
import { ICarFilters } from '../../../src/features/vehicles/interfaces/ICarFilters'

describe('useCarFilters composable', () => {
  it('should compute selected values correctly', () => {
    const props = {
      modelValue: {
        brand: 'Toyota',
        type: 'SUV' as CarType,
        status: '',
        year: 2021,
        orderBy: '',
        search: '',
        minPrice: '',
        maxPrice: '',
        page: 0,
        perPage: 6,
      } as ICarFilters,
    }

    const emit = vi.fn()
    const { selectedBrand, selectedType, selectedYear, selectedStatus } =
      useCarFilters(props, emit)

    expect(selectedBrand.value).toBe('Toyota')
    expect(selectedType.value).toBe('SUV')
    expect(selectedYear.value).toBe('2021')
    expect(selectedStatus.value).toBe('all')
  })

  it('should update filters correctly using handleBrandSelect', () => {
    const props = {
      modelValue: {
        brand: '',
        type: '',
        status: '',
        year: '',
        orderBy: '',
        search: '',
        minPrice: '',
        maxPrice: '',
        page: 0,
        perPage: 6,
      } as ICarFilters,
    }

    const emit = vi.fn()
    const { handleBrandSelect } = useCarFilters(props, emit)

    handleBrandSelect('Toyota')

    expect(emit).toHaveBeenCalledWith('update:modelValue', {
      ...props.modelValue,
      brand: 'Toyota',
      page: 0,
    })
  })

  it('should debounce search updates correctly', async () => {
    const props = {
      modelValue: {
        brand: '',
        type: '',
        status: '',
        year: '',
        orderBy: '',
        search: '',
        minPrice: '',
        maxPrice: '',
        page: 0,
        perPage: 6,
      } as ICarFilters,
    }

    const emit = vi.fn()
    const { searchValue } = useCarFilters(props, emit)

    searchValue.value = 'New search term'

    await new Promise(resolve => setTimeout(resolve, 300))

    expect(emit).toHaveBeenCalledWith('update:modelValue', {
      ...props.modelValue,
      search: 'New search term',
      page: 0,
    })
  })

  it('should debounce price updates correctly', async () => {
    const props = {
      modelValue: {
        brand: '',
        type: '',
        status: '',
        year: '',
        orderBy: '',
        search: '',
        minPrice: '',
        maxPrice: '',
        page: 0,
        perPage: 6,
      } as ICarFilters,
    }

    const emit = vi.fn()
    const { minPriceValue } = useCarFilters(props, emit)

    minPriceValue.value = '15000'

    // Esperar al debounce
    await new Promise(resolve => setTimeout(resolve, 300))

    expect(emit).toHaveBeenCalledWith('update:modelValue', {
      ...props.modelValue,
      minPrice: 15000,
      page: 0,
    })
  })

  it('should generate select configurations correctly', () => {
    const props = {
      modelValue: {
        brand: '',
        type: '',
        status: '',
        year: '',
        orderBy: '',
        search: '',
        minPrice: '',
        maxPrice: '',
        page: 0,
        perPage: 6,
      } as ICarFilters,
    }

    const emit = vi.fn()
    const { selectConfigs } = useCarFilters(props, emit)

    expect(Array.isArray(selectConfigs.value)).toBe(true)

    selectConfigs.value.forEach(config => {
      expect(config).toBeDefined()
      expect(config.options).toBeDefined()
    })
  })
})
