import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'

import type { ICarFilters } from '../../../src/features/vehicles/interfaces/ICarFilters'
import CarFilters from '../../../src/features/vehicles/presentation/components/filters/car-filters.vue'
import CarPriceRange from '../../../src/features/vehicles/presentation/components/filters/car-price-range.vue'

describe('CarFilters Component', () => {
  const mockFilters: ICarFilters = {
    search: '',
    type: '',
    status: '',
    year: '',
    brand: '',
    minPrice: '',
    maxPrice: '',
    orderBy: '',
  }

  it('should render correctly', () => {
    const wrapper = mount(CarFilters, {
      props: {
        modelValue: mockFilters,
      },
    })

    expect(wrapper.find('#search').exists()).toBe(true)
    const selects = wrapper.findAll('select')
    expect(selects).toHaveLength(5)
  })

  it('should emit updated search value', async () => {
    const wrapper = mount(CarFilters, {
      props: {
        modelValue: mockFilters,
      },
    })

    const input = wrapper.find('input')
    expect(input.exists()).toBe(true)

    await input.setValue('Toyota')
    wrapper.vm.$emit('update:modelValue', {
      ...mockFilters,
      search: 'Toyota',
      page: 0,
    })

    expect(wrapper.emitted('update:modelValue')?.[0]?.[0]).toEqual({
      ...mockFilters,
      search: 'Toyota',
      page: 0,
    })
  })

  it('should emit updated select value', async () => {
    const wrapper = mount(CarFilters, {
      props: {
        modelValue: mockFilters,
      },
    })

    const select = wrapper.find('select#brand')
    await select.setValue('Toyota')

    expect(wrapper.emitted('update:modelValue')).toHaveLength(1)
    expect(wrapper.emitted('update:modelValue')?.[0]?.[0]).toEqual({
      ...mockFilters,
      brand: 'Toyota',
      page: 0,
    })
  })

  it('should emit updated price range values', async () => {
    const wrapper = mount(CarFilters, {
      props: {
        modelValue: mockFilters,
      },
    })

    wrapper.vm.$emit('update:modelValue', {
      ...mockFilters,
      minPrice: 1000,
      page: 0,
    })

    wrapper.vm.$emit('update:modelValue', {
      ...mockFilters,
      maxPrice: 2000,
      page: 0,
    })

    expect(wrapper.emitted('update:modelValue')).toHaveLength(2)
    expect(wrapper.emitted('update:modelValue')?.[0]?.[0]).toEqual({
      ...mockFilters,
      minPrice: 1000,
      page: 0,
    })
    expect(wrapper.emitted('update:modelValue')?.[1]?.[0]).toEqual({
      ...mockFilters,
      maxPrice: 2000,
      page: 0,
    })
  })

  describe('CarPriceRange Component', () => {
    it('should render correctly', () => {
      const wrapper = mount(CarPriceRange, {
        props: {
          minPrice: '',
          maxPrice: '',
        },
      })

      const inputs = wrapper.findAll('input[type="number"]')
      expect(inputs).toHaveLength(2)
      expect(inputs[0].attributes('placeholder')).toBe('Mínimo')
      expect(inputs[1].attributes('placeholder')).toBe('Máximo')
    })

    it('should emit updated minPrice value', async () => {
      const wrapper = mount(CarPriceRange, {
        props: {
          minPrice: '',
          maxPrice: '',
        },
      })

      const minPriceInput = wrapper.find('input[placeholder="Mínimo"]')
      await minPriceInput.setValue('1000')

      expect(wrapper.emitted('update:minPrice')).toHaveLength(1)
      expect(wrapper.emitted('update:minPrice')?.[0]?.[0]).toBe(1000)
    })

    it('should emit updated maxPrice value', async () => {
      const wrapper = mount(CarPriceRange, {
        props: {
          minPrice: '',
          maxPrice: '',
        },
      })

      const maxPriceInput = wrapper.find('input[placeholder="Máximo"]')
      await maxPriceInput.setValue('2000')

      expect(wrapper.emitted('update:maxPrice')).toHaveLength(1)
      expect(wrapper.emitted('update:maxPrice')?.[0]?.[0]).toBe(2000)
    })
  })
})
