import { mount } from '@vue/test-utils'
import { describe, it, expect, vi } from 'vitest'
import { defineComponent } from 'vue'

import { useCars } from '../../../src/features/vehicles/composables/use-cars'
import { ICarFilters } from '../../../src/features/vehicles/interfaces/ICarFilters'
import { IFilter } from '../../../src/shared/interfaces/IFilter'

vi.mock('@/router', () => ({
  default: {
    push: vi.fn(),
  },
}))

vi.mock('@/features/cars/services/datasource', () => ({
  CarDataSourceImpl: {
    getInstance: vi.fn(() => ({
      getAll: vi.fn(async () => ({
        totalItems: 1,
        perPage: 6,
        page: 1,
        items: [
          {
            id: 1,
            brand: 'Toyota',
            model: 'Corolla',
            status: 'Disponible',
          },
        ],
      })),
      delete: vi.fn(),
      update: vi.fn(),
    })),
  },
}))

vi.mock('../../../src/core/infrastructure/http/axios-client', () => ({
  AxiosClient: class {
    static getInstance() {
      return {
        get: vi.fn(async url => {
          if (url === '/cars/filter') {
            return {
              totalItems: 1,
              perPage: 6,
              page: 1,
              items: [
                {
                  id: 1,
                  brand: 'Toyota',
                  model: 'Corolla',
                  status: 'Disponible',
                },
              ],
            }
          }
          return { totalItems: 0, items: [] }
        }),
      }
    }
  },
}))

const TestComponent = defineComponent({
  setup() {
    return useCars()
  },
  template: '<div />',
})

describe('useCars composable', () => {
  it('should initialize with default values', () => {
    const { loading, filters, cars, totalItems, fetchCars } = useCars()

    expect(loading.value).toBe(false)
    expect((filters.value as unknown as IFilter).page).toBe(0)
    expect((filters.value as unknown as IFilter).perPage).toBe(6)
    expect(cars.value).toEqual([])
    expect(totalItems.value).toBe(0)
    expect(typeof fetchCars).toBe('function')
  })

  it('should clean filters correctly', () => {
    const wrapper = mount(TestComponent)
    const { cleanFilters } = wrapper.vm

    const cleanFiltersMock: ICarFilters = {
      search: '',
      type: '',
      status: '',
      brand: '',
      maxPrice: '',
      minPrice: '',
      orderBy: '',
      year: 2020,
    }

    const cleaned = cleanFilters(cleanFiltersMock)
    expect(cleaned).toEqual({ year: 2020 })
  })

  it('should fetch cars and update state correctly', async () => {
    const { fetchCars, cars, totalItems, loading } = useCars()

    await fetchCars()

    expect(loading.value).toBe(false)
    expect(cars.value).toEqual([
      { id: 1, brand: 'Toyota', model: 'Corolla', status: 'Disponible' },
    ])
    expect(totalItems.value).toBe(1)
  })

  it('should handle view car action correctly', () => {
    const wrapper = mount(TestComponent)
    const { handleViewCar } = wrapper.vm

    const consoleSpy = vi.spyOn(console, 'log')
    handleViewCar(1)

    expect(consoleSpy).toHaveBeenCalledWith('View car:', 1)
  })

  it('should handle rent car action correctly', () => {
    const wrapper = mount(TestComponent)
    const { handleRentCar } = wrapper.vm

    const consoleSpy = vi.spyOn(console, 'log')
    handleRentCar(1)

    expect(consoleSpy).toHaveBeenCalledWith('Renting car:', 1)
  })
})
