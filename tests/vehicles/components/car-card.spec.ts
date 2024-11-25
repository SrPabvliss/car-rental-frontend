import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'

import type { ICar } from '../../../src/features/vehicles/interfaces/ICar'
import CarCard from '../../../src/features/vehicles/presentation/components/car-card.vue'

describe('CarCard Component', () => {
  const mockCar: ICar = {
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
    plate: 'ABC-1234',
  }

  it('renders car details correctly', () => {
    const wrapper = mount(CarCard, {
      props: {
        car: mockCar,
      },
    })

    expect(wrapper.find('h3').text()).toBe('Toyota Corolla')
    expect(wrapper.find('p.text-sm').text()).toContain('2022 • Sedán')
    expect(wrapper.find('.text-xl').text()).toBe('$50.00/día')
  })

  it('emits "view" event when "Ver detalles" button is clicked', async () => {
    const wrapper = mount(CarCard, {
      props: {
        car: mockCar,
      },
    })

    await wrapper.find('button').trigger('click')
    expect(wrapper.emitted('view')).toHaveLength(1)
    expect(wrapper.emitted('view')?.[0]).toEqual([1])
  })

  it('emits "edit" event when "Editar" button is clicked', async () => {
    const wrapper = mount(CarCard, {
      props: {
        car: mockCar,
      },
    })

    const editButton = wrapper.find('[data-testid="edit-car-button"]')
    await editButton.trigger('click')
    expect(wrapper.emitted('edit')).toHaveLength(1)
    expect(wrapper.emitted('edit')?.[0]).toEqual([1])
  })

  it('emits "delete" event when "Eliminar" button is clicked', async () => {
    const wrapper = mount(CarCard, {
      props: {
        car: mockCar,
      },
    })

    const deleteButton = wrapper.find('[data-testid="delete-button-1"]')
    await deleteButton.trigger('click')
    expect(wrapper.emitted('delete')).toHaveLength(1)
    expect(wrapper.emitted('delete')?.[0]).toEqual([1])
  })

  it('emits "changeStatus" event when a status is selected', async () => {
    const wrapper = mount(CarCard, {
      props: {
        car: mockCar,
      },
      global: {
        stubs: {
          Button: true,
          Badge: true,
          DropdownMenu: {
            template: '<div><slot /></div>',
          },
          DropdownMenuTrigger: {
            template: '<button data-testid="menu-trigger"><slot /></button>',
          },
          DropdownMenuContent: {
            template: '<div><slot /></div>',
          },
          DropdownMenuItem: {
            template:
              '<div @click,stop="$emit(\'click\')" data-testid="status-option-mantenimiento"><slot /></div>',
          },
        },
      },
    })

    const menuTrigger = wrapper.find('[data-testid="menu-trigger"]')
    expect(menuTrigger.exists()).toBe(true)

    await menuTrigger.trigger('click')

    const statusOption = wrapper.find(
      '[data-testid="status-option-mantenimiento"]',
    )
    expect(statusOption.exists()).toBe(true)

    await statusOption.trigger('click')

    expect(wrapper.emitted('changeStatus')).toHaveLength(1)
    expect(wrapper.emitted('changeStatus')?.[0]).toEqual([
      mockCar.id,
      'En mantenimiento',
    ])
  })
})
