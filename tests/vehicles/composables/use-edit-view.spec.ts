import { mount } from '@vue/test-utils'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { defineComponent } from 'vue'
import { useRoute } from 'vue-router'

import useEditVehicle from '../../../src/features/vehicles/composables/use-edit-view'
import { CarDataSourceImpl } from '../../../src/features/vehicles/services/datasource'

vi.mock('vue-toastification', () => ({
  useToast: vi.fn(() => ({
    error: vi.fn(),
    success: vi.fn(),
  })),
}))

vi.mock('vue-router', () => ({
  useRoute: vi.fn(() => ({
    params: { id: '1' },
  })),
}))

vi.mock('../../../src/features/vehicles/services/datasource', () => ({
  CarDataSourceImpl: {
    getInstance: vi.fn(() => ({
      getById: vi.fn(async () => ({
        id: 1,
        brand: 'Toyota',
        model: 'Corolla',
        status: 'Disponible',
        mileage: 15000,
        dailyRate: 50,
      })),
      getAll: vi.fn(),
      create: vi.fn(),
      delete: vi.fn(),
      update: vi.fn(),
    })),
  },
}))

const TestComponent = defineComponent({
  setup() {
    return useEditVehicle()
  },
  template: '<div />',
})

describe('useEditVehicle composable', () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let wrapper: any

  beforeEach(() => {
    wrapper = mount(TestComponent)
  })

  it('should initialize with default values', () => {
    const { vehicle, breadcrumbItems, isLoading } = useEditVehicle()

    expect(vehicle).toBeDefined()
    expect(vehicle.value).toBeNull()
    expect(isLoading.value).toBe(false)
    expect(breadcrumbItems.value).toEqual([
      { label: 'Vehículos', href: 'cars' },
      { label: 'Editar', href: '', current: true },
    ])
  })

  it('should load a vehicle successfully', async () => {
    const { loadVehicle, vehicle, isLoading } = useEditVehicle()

    await loadVehicle()

    expect(isLoading.value).toBe(false)
    expect(vehicle.value).toEqual({
      id: 1,
      brand: 'Toyota',
      model: 'Corolla',
      status: 'Disponible',
      mileage: 15000,
      dailyRate: 50,
    })
  })

  it('should show an error if the vehicle ID is invalid', async () => {
    vi.mocked(useRoute).mockReturnValueOnce({
      params: { id: '' },
      matched: [],
      name: undefined,
      fullPath: '',
      query: {},
      hash: '',
      path: '',
      redirectedFrom: undefined,
      meta: {},
    })

    const { loadVehicle, isLoading } = useEditVehicle()

    await loadVehicle()

    expect(isLoading.value).toBe(false)
  })

  it('should show an error if fetching the vehicle fails', async () => {
    const mockGetById = vi.mocked(CarDataSourceImpl.getInstance().getById)
    mockGetById.mockRejectedValueOnce(new Error())

    const { loadVehicle, isLoading } = useEditVehicle()

    await loadVehicle()

    expect(isLoading.value).toBe(false)
  })
})
