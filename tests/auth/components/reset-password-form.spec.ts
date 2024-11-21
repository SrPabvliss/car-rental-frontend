import { mount } from '@vue/test-utils'
import { describe, it, expect, vi } from 'vitest'
import { ref } from 'vue'
import { z } from 'zod'

import useResetPassword from '../../../src/features/auth/composables/use-reset-password'
import ResetPasswordForm from '../../../src/features/auth/presentation/components/reset-password-form.vue'
import { useForm } from '../../../src/lib/composables/use-form'

vi.mock('../../../src/features/auth/composables/use-reset-password', () => ({
  default: vi.fn(() => ({
    schema: z.object({
      token: z.string().min(3),
      newPassword: z.string().min(3),
      confirmPassword: z.string().min(3),
    }),
    onSubmit: vi.fn(),
    isLoading: ref(false),
  })),
}))

vi.mock('../../../src/lib/composables/use-form', () => ({
  useForm: vi.fn(() => ({
    formData: ref({
      token: '',
      newPassword: '',
      confirmPassword: '',
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

describe('ResetPasswordForm', () => {
  it('renders correctly', () => {
    const wrapper = mount(ResetPasswordForm, globalMountOptions)
    expect(wrapper.find('form').exists()).toBe(true)
    expect(wrapper.findAll('input').length).toBe(3)
    expect(wrapper.find('button[type="submit"]').exists()).toBe(true)
  })

  it('disables the submit button when loading', () => {
    vi.mocked(useResetPassword).mockReturnValue({
      schema: z.object({ token: z.string().min(3) }),
      onSubmit: vi.fn(),
      isLoading: ref(true),
    })

    const wrapper = mount(ResetPasswordForm, globalMountOptions)
    const button = wrapper.find('button[type="submit"]')

    expect(button.attributes('disabled')).toBe('')
  })

  it('displays validation errors when input is invalid', async () => {
    const validateFieldMock = vi.fn()
    vi.mocked(useForm).mockReturnValue({
      formData: ref({ token: '', newPassword: '', confirmPassword: '' }),
      errors: ref({ token: 'Token es requerido' }),
      handleSubmit: vi.fn(),
      validateField: validateFieldMock,
      resetForm: vi.fn(),
    })

    const wrapper = mount(ResetPasswordForm, globalMountOptions)
    await wrapper.find('input#token').setValue('')
    await wrapper.find('input#token').trigger('input')

    expect(validateFieldMock).toHaveBeenCalledWith('token')
    expect(wrapper.find('p.text-red-500').text()).toContain(
      'Token es requerido',
    )
  })

  it('calls onSubmit when the form is submitted', async () => {
    const onSubmitMock = vi.fn()
    vi.mocked(useResetPassword).mockReturnValue({
      schema: z.object({ token: z.string().min(3) }),
      onSubmit: onSubmitMock,
      isLoading: ref(false),
    })

    const handleSubmitMock = vi.fn(callback => {
      callback({
        token: 'valid-token',
        newPassword: 'password123',
        confirmPassword: 'password123',
      })
    })

    vi.mocked(useForm).mockReturnValue({
      formData: ref({
        token: 'valid-token',
        newPassword: 'password123',
        confirmPassword: 'password123',
      }),
      errors: ref({}),
      handleSubmit: handleSubmitMock,
      validateField: vi.fn(),
      resetForm: vi.fn(),
    })

    const wrapper = mount(ResetPasswordForm, globalMountOptions)
    await wrapper.find('form').trigger('submit.prevent')

    expect(onSubmitMock).toHaveBeenCalledWith({
      token: 'valid-token',
      newPassword: 'password123',
      confirmPassword: 'password123',
    })
  })
})
