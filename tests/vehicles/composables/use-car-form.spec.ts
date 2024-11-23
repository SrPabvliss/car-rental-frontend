import { mount } from '@vue/test-utils'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { defineComponent } from 'vue'

import useCarForm from '../../../src/features/vehicles/composables/use-car-form'
import {
  CarStatus,
  CarType,
} from '../../../src/features/vehicles/interfaces/ICar'
import { CarDataSourceImpl } from '../../../src/features/vehicles/services/datasource'
import router from '../../../src/router/index'

vi.mock('@/router', () => ({
  default: {
    push: vi.fn(),
  },
}))

vi.mock('../../../src/features/vehicles/services/datasource', () => ({
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
      create: vi.fn(async carData => carData),
      update: vi.fn(async carData => carData),
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
        }),
        post: vi.fn(),
        put: vi.fn(),
        patch: vi.fn(),
      }
    }
  },
}))

vi.mock('vue-toastification', () => ({
  useToast: vi.fn(() => ({
    error: vi.fn(),
    success: vi.fn(),
  })),
}))

const TestComponent = defineComponent({
  setup() {
    return useCarForm()
  },
  template: '<div />',
})

describe('useCarForm composable', () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let car: any

  beforeEach(() => {
    car = {
      id: 1,
      brand: 'Toyota',
      model: 'Corolla',
      color: 'Azul',
      plate: 'XYZ123',
      type: 'Económico',
      status: 'Disponible',
      year: 2023,
      mileage: 15000,
      dailyRate: 50,
      imageUrl: 'http://example.com/image.jpg',
    }
    vi.clearAllMocks()
  })

  it('should validate a valid car input', () => {
    const { schema } = useCarForm()
    const result = schema.safeParse({
      brand: 'Toyota',
      model: 'Corolla',
      color: 'Azul',
      plate: 'XYZ789',
      type: 'Económico',
      status: 'Disponible',
      year: 2023,
      mileage: 15000,
      dailyRate: 45,
    })

    expect(result.success).toBe(true)
  })

  it('should fail validation if required fields are missing or invalid', () => {
    const { schema } = useCarForm()
    const result = schema.safeParse({
      brand: undefined,
      model: undefined,
      color: 'Az',
      plate: undefined,
      type: undefined,
      status: undefined,
      year: 1999,
      mileage: -5000,
      dailyRate: 0,
    })

    expect(result.success).toBe(false)

    const errorMessages = result.error?.issues.map(issue => issue.message)

    expect(errorMessages).toEqual(
      expect.arrayContaining([
        'La marca es requerida.',
        'El modelo es requerido.',
        'El color debe tener más de 3 caracteres ',
        'La placa es requerida.',
        'El tipo de vehículo es requerido.',
        'El estado es requerido.',
        'El año debe ser 2000 o posterior.',
        'El kilometraje no puede ser negativo.',
        'La tarifa diaria debe ser mayor a 0.',
      ]),
    )
  })

  it('should create a new car successfully', async () => {
    const wrapper = mount(TestComponent)
    const { onSubmit, isLoading } = wrapper.vm

    const formData = {
      brand: 'Honda',
      model: 'Civic',
      color: 'Rojo',
      plate: 'DEF456',
      type: 'Sedán' as CarType,
      status: 'Disponible' as CarStatus,
      year: 2023,
      mileage: 5000,
      dailyRate: 60,
    }

    await onSubmit(formData)

    expect(isLoading).toBe(false)

    const routerMock = vi.mocked(router.push)
    expect(routerMock).toHaveBeenCalledWith({ name: 'cars' })
  })

  it('should update a car successfully', async () => {
    mount(TestComponent)
    const { onSubmit } = useCarForm({
      id: 1,
      brand: 'Toyota',
      model: 'Corolla',
      color: 'Azul',
      plate: 'ABC123',
      type: 'Sedán' as CarType,
      status: 'Disponible' as CarStatus,
      year: 2022,
      mileage: 15000,
      dailyRate: 55,
      imageUrl: 'http://example.com/car.jpg',
    })

    const formData = {
      brand: 'Toyota',
      model: 'Corolla',
      color: 'Azul',
      plate: 'ABC123',
      type: 'Sedán' as CarType,
      status: 'Disponible' as CarStatus,
      year: 2022,
      mileage: 16000,
      dailyRate: 55,
      imageUrl: 'http://example.com/car.jpg',
    }

    await onSubmit(formData)

    const routerMock = vi.mocked(router.push)
    expect(routerMock).toHaveBeenCalledWith({ name: 'cars' })
  })

  it('should not update a car if no changes are made', async () => {
    mount(TestComponent)
    const { onSubmit } = useCarForm({
      id: 1,
      brand: 'Toyota',
      model: 'Corolla',
      color: 'Azul',
      plate: 'ABC123',
      type: 'Sedán' as CarType,
      status: 'Disponible' as CarStatus,
      year: 2022,
      mileage: 15000,
      dailyRate: 55,
      imageUrl: 'http://example.com/car.jpg',
    })

    const updateMock = vi.mocked(CarDataSourceImpl.getInstance().update)

    const unchangedCar = {
      id: 1,
      brand: 'Toyota',
      model: 'Corolla',
      color: 'Azul',
      plate: 'ABC123',
      type: 'Sedán' as CarType,
      status: 'Disponible' as CarStatus,
      year: 2022,
      mileage: 15000,
      dailyRate: 55,
      imageUrl: 'http://example.com/car.jpg',
    }

    await onSubmit(unchangedCar)

    expect(updateMock).not.toHaveBeenCalled()

    const routerMock = vi.mocked(router.push)
    expect(routerMock).not.toHaveBeenCalled()
  })
})
