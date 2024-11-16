import { mount } from '@vue/test-utils'
import { describe, it, expect, vi } from 'vitest'
import { ref } from 'vue'
import { z } from 'zod'

import useRegister from '../../../src/features/auth/composables/use-register'
import RegisterForm from '../../../src/features/auth/presentation/components/register-form.vue'
import { useForm } from '../../../src/lib/composables/use-form'

vi.mock('../../../src/features/auth/composables/use-register', () => ({
  default: vi.fn(() => ({
    schema: z.object({
      name: z.string().min(3),
      lastName: z.string().min(3),
      email: z.string().email(),
      password: z.string().min(5),
      address: z.string().min(3),
      role: z.enum(['Administrador', 'Empleado', 'Cliente']),
      phone: z.string().min(3).max(15),
    }),
    onSubmit: vi.fn(),
    isLoading: ref(false),
  })),
}))

vi.mock('../../../src/lib/composables/use-form', () => ({
  useForm: vi.fn(() => ({
    formData: ref({
      name: '',
      lastName: '',
      email: '',
      password: '',
      address: '',
      role: '',
      phone: '',
    }),
    errors: ref({}),
    handleSubmit: vi.fn(),
    validateField: vi.fn(),
  })),
}))

vi.mock('@/components/ui/button', () => ({
  Button: {
    name: 'Button',
    template:
      '<button type="submit" :disabled="disabled"><slot></slot></button>',
    props: ['disabled'],
  },
}))

vi.mock('@/components/ui/input', () => ({
  Input: {
    name: 'Input',
    template: '<input />',
  },
}))

vi.mock('@/components/ui/label', () => ({
  Label: {
    name: 'Label',
    template: '<label><slot></slot></label>',
  },
}))

const globalMountOptions = {
  global: {
    stubs: {
      'router-link': true,
    },
  },
}

describe('RegisterForm', () => {
  it('renders correctly', () => {
    const wrapper = mount(RegisterForm, globalMountOptions)
    expect(wrapper.find('form').exists()).toBe(true)
    expect(wrapper.findAll('input').length).toBe(6)
    expect(wrapper.find('button[type="submit"]').exists()).toBe(true)
    expect(wrapper.find('select').exists()).toBe(true)
  })

  it('disables the submit button when loading', () => {
    vi.mocked(useRegister).mockReturnValue({
      schema: z.object({
        name: z.string().min(3),
        lastName: z.string().min(3),
        email: z.string().email(),
        password: z.string().min(5),
        address: z.string().min(3),
        role: z.enum(['Administrador', 'Empleado', 'Cliente']),
        phone: z.string().min(3).max(15),
      }),
      onSubmit: vi.fn(),
      isLoading: ref(true),
    })

    const wrapper = mount(RegisterForm, globalMountOptions)
    const button = wrapper.find('button[type="submit"]')

    expect(button.attributes('disabled')).toBe('')
  })

  it('displays validation errors when input is invalid', async () => {
    const validateFieldMock = vi.fn()
    vi.mocked(useForm).mockReturnValue({
      formData: ref({ name: '', email: '' }),
      errors: ref({ name: 'Nombre es requerido', email: 'Correo no válido' }),
      handleSubmit: vi.fn(),
      validateField: validateFieldMock,
    })

    const wrapper = mount(RegisterForm, globalMountOptions)
    await wrapper.find('input#name').setValue('')
    await wrapper.find('input#name').trigger('input')

    expect(validateFieldMock).toHaveBeenCalledWith('name')
    expect(wrapper.find('p.text-red-500').text()).toContain(
      'Nombre es requerido',
    )
  })

  it('calls onSubmit when the form is submitted', async () => {
    const onSubmitMock = vi.fn()
    vi.mocked(useRegister).mockReturnValue({
      schema: z.object({
        name: z.string().min(3),
        lastName: z.string().min(3),
        email: z.string().email(),
        password: z.string().min(5),
        address: z.string().min(3),
        role: z.enum(['Administrador', 'Empleado', 'Cliente']),
        phone: z.string().min(3).max(15),
      }),
      onSubmit: onSubmitMock,
      isLoading: ref(false),
    })

    const handleSubmitMock = vi.fn(callback => {
      callback({
        name: 'John',
        lastName: 'Doe',
        email: 'test@example.com',
        password: 'password123',
        address: '123 Main St',
        role: 'Admin',
        phone: '1234567890',
      })
    })

    vi.mocked(useForm).mockReturnValue({
      formData: ref({
        name: 'John',
        lastName: 'Doe',
        email: 'test@example.com',
        password: 'password123',
        address: '123 Main St',
        role: 'Admin',
        phone: '1234567890',
      }),
      errors: ref({}),
      handleSubmit: handleSubmitMock,
      validateField: vi.fn(),
    })

    const wrapper = mount(RegisterForm, globalMountOptions)
    await wrapper.find('form').trigger('submit.prevent')

    expect(onSubmitMock).toHaveBeenCalledWith({
      name: 'John',
      lastName: 'Doe',
      email: 'test@example.com',
      password: 'password123',
      address: '123 Main St',
      role: 'Admin',
      phone: '1234567890',
    })
  })
})
