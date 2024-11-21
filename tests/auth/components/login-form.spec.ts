import { mount } from '@vue/test-utils'
import { describe, it, expect, vi } from 'vitest'
import { ref } from 'vue'
import { z } from 'zod'

import useLogin from '../../../src/features/auth/composables/use-login'
import LoginForm from '../../../src/features/auth/presentation/components/login-form.vue'
import { useForm } from '../../../src/lib/composables/use-form'

vi.mock('../../../src/features/auth/composables/use-login', () => ({
  default: vi.fn(() => ({
    schema: z.object({
      email: z.string().email(),
      password: z.string().min(3),
    }),
    onSubmit: vi.fn(),
    isLoading: ref(false),
  })),
}))

vi.mock('../../../src/lib/composables/use-form', () => ({
  useForm: vi.fn(() => ({
    formData: { email: '', password: '' },
    errors: { email: 'Correo inválido', password: 'Contraseña requerida' },
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

describe('LoginForm', () => {
  it('renders correctly', () => {
    const wrapper = mount(LoginForm, globalMountOptions)
    expect(wrapper.find('form').exists()).toBe(true)
    expect(wrapper.find('input[type="email"]').exists()).toBe(true)
    expect(wrapper.find('input[type="password"]').exists()).toBe(true)
    expect(wrapper.find('button[type="submit"]').exists()).toBe(true)
  })

  it('calls onSubmit when the form is submitted', async () => {
    const onSubmitMock = vi.fn()

    vi.mocked(useLogin).mockReturnValue({
      schema: z.object({
        email: z.string().email(),
        password: z.string().min(5),
      }),
      onSubmit: onSubmitMock,
      isLoading: ref(false),
    })

    vi.mocked(useForm).mockReturnValue({
      formData: ref({ email: '', password: '' }),
      errors: ref({}),
      validateField: vi.fn(),
      handleSubmit: callback => {
        callback({ email: 'test@test.com', password: '12345' })
      },
      resetForm: vi.fn(),
    })

    const wrapper = mount(LoginForm, globalMountOptions)
    await wrapper.find('form').trigger('submit.prevent')

    expect(onSubmitMock).toHaveBeenCalledWith({
      email: 'test@test.com',
      password: '12345',
    })
  })

  it('disables the submit button when loading', () => {
    vi.mocked(useLogin).mockReturnValue({
      schema: z.object({
        email: z.string().email(),
        password: z.string().min(5),
      }),
      onSubmit: vi.fn(),
      isLoading: ref(true),
    })

    const wrapper = mount(LoginForm, globalMountOptions)
    const button = wrapper.find('button[type="submit"]')

    expect(button.attributes('disabled')).toBe('')
  })

  it('displays validation errors when input is invalid', async () => {
    const validateFieldMock = vi.fn()
    vi.mocked(useForm).mockReturnValue({
      formData: ref({ email: '', password: '' }),
      errors: ref({
        email: 'Correo inválido',
        password: 'Contraseña requerida',
      }),
      handleSubmit: vi.fn(),
      validateField: validateFieldMock,
      resetForm: vi.fn(),
    })

    const wrapper = mount(LoginForm, globalMountOptions)

    await wrapper.find('input[type="email"]').setValue('invalid')
    await wrapper.find('input[type="email"]').trigger('input')
    expect(validateFieldMock).toHaveBeenCalledWith('email')
    expect(wrapper.find('p.text-red-500').text()).toContain('Correo inválido')
  })
})
