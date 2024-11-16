import { describe, it, expect } from 'vitest'

import useResetPassword from '../../../src/features/auth/composables/use-reset-password'

const { schema } = useResetPassword()

describe('useResetPassword validation schema', () => {
  it('validates a valid input', () => {
    const result = schema.safeParse({
      token: 'valid-token',
      newPassword: 'password123',
      confirmPassword: 'password123',
    })

    expect(result.success).toBe(true)
  })

  it('fails if passwords do not match', () => {
    const result = schema.safeParse({
      token: 'valid-token',
      newPassword: 'password123',
      confirmPassword: 'password456',
    })

    expect(result.success).toBe(false)
    expect(result.error?.issues).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          message: 'Las contraseñas no coinciden.',
          path: ['confirmPassword'],
        }),
      ]),
    )
  })

  it('fails if token is missing', () => {
    const result = schema.safeParse({
      token: undefined,
      newPassword: 'password123',
      confirmPassword: 'password123',
    })

    expect(result.success).toBe(false)
    expect(result.error?.issues).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ message: 'El token es requerido.' }),
      ]),
    )
  })
})
