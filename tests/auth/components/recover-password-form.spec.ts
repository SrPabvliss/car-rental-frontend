import { mount } from '@vue/test-utils'
import { describe, it, expect, vi } from 'vitest'
import { ref } from 'vue'
import { z } from 'zod'

import useRecoverPasswordReq from '../../../src/features/auth/composables/use-recover-password'
import RecoverPasswordForm from '../../../src/features/auth/presentation/components/recover-password-req-form.vue'
import { useForm } from '../../../src/lib/composables/use-form'

vi.mock('@/features/auth/composables/use-recover-password', () => ({
  default: vi.fn(() => ({
    schema: z.object({
      email: z.string().email({ message: 'El email no es válido.' }),
    }),
    onSubmit: vi.fn(),
    isLoading: ref(false),
  })),
}))

vi.mock('@/lib/composables/use-form', () => ({
  useForm: vi.fn(() => ({
    formData: ref({ email: '' }),
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

describe('RecoverPasswordForm', () => {
  it('renders correctly', () => {
    const wrapper = mount(RecoverPasswordForm, globalMountOptions)
    expect(wrapper.find('form').exists()).toBe(true)
    expect(wrapper.find('input[type="email"]').exists()).toBe(true)
    expect(wrapper.find('button[type="submit"]').exists()).toBe(true)
  })

  it('disables the submit button when loading', () => {
    vi.mocked(useRecoverPasswordReq).mockReturnValue({
      schema: z.object({ email: z.string().email() }),
      onSubmit: vi.fn(),
      isLoading: ref(true),
    })

    const wrapper = mount(RecoverPasswordForm, globalMountOptions)
    const button = wrapper.find('button[type="submit"]')

    expect(button.attributes('disabled')).toBe('')
  })

  it('displays validation errors when input is invalid', async () => {
    const validateFieldMock = vi.fn()
    vi.mocked(useForm).mockReturnValue({
      formData: ref({ email: '' }),
      errors: ref({ email: 'Correo inválido' }),
      handleSubmit: vi.fn(),
      validateField: validateFieldMock,
    })

    const wrapper = mount(RecoverPasswordForm, globalMountOptions)
    await wrapper.find('input[type="email"]').setValue('invalid')
    await wrapper.find('input[type="email"]').trigger('input')

    expect(validateFieldMock).toHaveBeenCalledWith('email')
    expect(wrapper.find('p.text-red-500').text()).toContain('Correo inválido')
  })

  it('calls onSubmit when the form is submitted', async () => {
    const onSubmitMock = vi.fn()
    vi.mocked(useRecoverPasswordReq).mockReturnValue({
      schema: z.object({ email: z.string().email() }),
      onSubmit: onSubmitMock,
      isLoading: ref(false),
    })

    const handleSubmitMock = vi.fn(callback => {
      callback({ email: 'test@example.com' })
    })

    vi.mocked(useForm).mockReturnValue({
      formData: ref({ email: 'test@example.com' }),
      errors: ref({}),
      handleSubmit: handleSubmitMock,
      validateField: vi.fn(),
    })

    const wrapper = mount(RecoverPasswordForm, globalMountOptions)
    await wrapper.find('form').trigger('submit.prevent')

    expect(onSubmitMock).toHaveBeenCalledWith({ email: 'test@example.com' })
  })
})
