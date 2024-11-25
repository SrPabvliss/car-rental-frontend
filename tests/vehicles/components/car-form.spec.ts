import { mount } from '@vue/test-utils'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { ref } from 'vue'
import { z } from 'zod'

import useCarForm from '../../../src/features/vehicles/composables/use-car-form'
import CarForm from '../../../src/features/vehicles/presentation/components/forms/new-edit-form.vue'
import { useForm } from '../../../src/lib/composables/use-form'

const schemaForMock = z.object({
  brand: z.string().min(1, { message: 'La marca es requerida.' }),
  model: z
    .string()
    .min(3, { message: 'El modelo debe tener más de 3 caracteres.' }),
  color: z
    .string()
    .min(3, { message: 'El color debe tener más de 3 caracteres.' }),
  plate: z
    .string()
    .min(3, { message: 'La placa debe tener más de 3 caracteres.' }),
  type: z.enum(
    [
      'Económico',
      'Sedán',
      'SUV Compacto',
      'SUV Grande',
      'Lujo',
      'Camioneta',
      'Minivan',
      'Deportivo',
    ],
    { message: 'El tipo de vehículo es requerido.' },
  ),
  status: z.enum(['Disponible', 'Alquilado', 'En mantenimiento'], {
    message: 'El estado es requerido.',
  }),
  year: z.number().min(2000, { message: 'El año debe ser 2000 o posterior.' }),
  mileage: z
    .number()
    .nonnegative({ message: 'El kilometraje no puede ser negativo.' }),
  dailyRate: z
    .number()
    .positive({ message: 'La tarifa diaria debe ser mayor a 0.' }),
  imageUrl: z.string().optional(),
})

vi.mock('../../../src/features/vehicles/composables/use-car-form', () => ({
  default: vi.fn(() => ({
    schema: schemaForMock,
    onSubmit: vi.fn(),
    isLoading: ref(false),
    openWidget: vi.fn(),
    imageUrl: ref(null),
  })),
}))

vi.mock('../../../src/lib/composables/use-form', () => ({
  useForm: vi.fn(() => ({
    formData: ref({
      brand: '',
      model: '',
      color: '',
      plate: '',
      type: '',
      status: '',
      year: '',
      mileage: '',
      dailyRate: '',
    }),
    errors: ref({
      brand: 'La marca es requerida.',
    }),
    handleSubmit: vi.fn(),
    validateField: vi.fn(),
    resetForm: vi.fn(),
  })),
}))

describe('CarForm Component', () => {
  let wrapper: any

  beforeEach(() => {
    wrapper = mount(CarForm, {
      props: {
        car: null,
      },
    })
  })

  it('renders all fields correctly', () => {
    expect(wrapper.find('#brand').exists()).toBe(true)
    expect(wrapper.find('#model').exists()).toBe(true)
    expect(wrapper.find('#color').exists()).toBe(true)
    expect(wrapper.find('#plate').exists()).toBe(true)
    expect(wrapper.find('#type').exists()).toBe(true)
    expect(wrapper.find('#status').exists()).toBe(true)
    expect(wrapper.find('#year').exists()).toBe(true)
    expect(wrapper.find('#mileage').exists()).toBe(true)
    expect(wrapper.find('#dailyRate').exists()).toBe(true)
    expect(wrapper.find('button[type="submit"]').exists()).toBe(true)
  })

  it('disables the submit button when loading', () => {
    vi.mocked(useCarForm).mockReturnValueOnce({
      schema: schemaForMock,
      onSubmit: vi.fn(),
      isLoading: ref(true),
      openWidget: vi.fn(),
      imageUrl: ref(null),
    })

    const wrapperWithLoading = mount(CarForm)
    const submitButton = wrapperWithLoading.find('button[type="submit"]')
    expect(submitButton.attributes('disabled')).toBeDefined()
  })

  it('calls onSubmit with form data when the form is submitted', async () => {
    const onSubmitMock = vi.fn()
    vi.mocked(useCarForm).mockReturnValueOnce({
      schema: schemaForMock,
      onSubmit: onSubmitMock,
      isLoading: ref(false),
      openWidget: vi.fn(),
      imageUrl: ref(null),
    })

    const handleSubmitMock = vi.fn((callback: any) => callback())
    vi.mocked(useForm).mockReturnValueOnce({
      formData: ref({
        brand: 'Toyota',
        model: 'Corolla',
        color: 'Negro',
        plate: 'ABC123',
        type: 'SUV',
        status: 'Disponible',
        year: 2022,
        mileage: 10000,
        dailyRate: 50,
      }),
      errors: ref({}),
      handleSubmit: handleSubmitMock,
      validateField: vi.fn(),
      resetForm: vi.fn(),
    })

    const wrapper = mount(CarForm, {
      props: {
        car: null,
      },
    })

    await wrapper.find('form').trigger('submit.prevent')

    expect(handleSubmitMock).toHaveBeenCalled()
    expect(onSubmitMock).toHaveBeenCalled()
  })

  it('shows validation errors when input is invalid', async () => {
    const validateFieldMock = vi.fn()

    vi.mocked(useForm).mockReturnValueOnce({
      formData: ref({
        brand: '',
        model: '',
        color: '',
        plate: '',
        type: '',
        status: '',
        year: '',
        mileage: '',
        dailyRate: '',
      }),
      errors: ref({ brand: 'La marca es requerida.' }),
      handleSubmit: vi.fn(),
      validateField: validateFieldMock,
      resetForm: vi.fn(),
    })

    const wrapper = mount(CarForm, {
      props: {
        car: null,
      },
    })

    const input = wrapper.find('#brand')

    await input.setValue('')
    await input.trigger('input')

    expect(validateFieldMock).toHaveBeenCalledWith('brand')

    const errorMessage = wrapper.find('p.text-red-500')
    expect(errorMessage.exists()).toBe(true)
    expect(errorMessage.text()).toContain('La marca es requerida.')
  })
})
