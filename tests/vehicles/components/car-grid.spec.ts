import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'

import type { ICar } from '../../../src/features/vehicles/interfaces/ICar'
import CarsGrid from '../../../src/features/vehicles/presentation/components/cars-grid.vue'

describe('CarsGrid Component', () => {
  const mockCars: ICar[] = [
    {
      id: 1,
      brand: 'Toyota',
      model: 'Corolla',
      year: 2022,
      mileage: 15000,
      dailyRate: 50,
      imageUrl: 'https://example.com/image.jpg',
      status: 'Disponible',
      type: 'Sedán',
      color: 'Red',
      plate: 'ABC123',
    },
    {
      id: 2,
      brand: 'Honda',
      model: 'Civic',
      year: 2023,
      mileage: 12000,
      dailyRate: 60,
      imageUrl: 'https://example.com/image2.jpg',
      status: 'Alquilado',
      type: 'Sedán',
      color: 'Blue',
      plate: 'XYZ789',
    },
  ]

  it('renders "No vehicles" message when no cars are available', () => {
    const wrapper = mount(CarsGrid, {
      props: {
        cars: [],
        loading: false,
      },
    })

    expect(wrapper.find('h3').text()).toBe('No hay vehículos disponibles')
  })

  it('renders loading skeletons when loading', () => {
    const wrapper = mount(CarsGrid, {
      props: {
        cars: [],
        loading: true,
      },
    })

    const skeletons = wrapper.findAll('.animate-pulse')
    expect(skeletons).toHaveLength(6)
  })

  it('renders CarCard components when cars are provided', () => {
    const wrapper = mount(CarsGrid, {
      props: {
        cars: mockCars,
        loading: false,
      },
    })

    const carCards = wrapper.findAllComponents({ name: 'CarCard' })
    expect(carCards).toHaveLength(2)
  })

  it('emits events from CarCard components', async () => {
    const wrapper = mount(CarsGrid, {
      props: {
        cars: mockCars,
        loading: false,
      },
    })

    const carCard = wrapper.findComponent({ name: 'CarCard' })

    await carCard.vm.$emit('edit', 1)
    expect(wrapper.emitted('edit')).toHaveLength(1)
    expect(wrapper.emitted('edit')?.[0]).toEqual([1])
  })
})
