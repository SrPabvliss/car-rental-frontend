import { describe, it, expect } from 'vitest'

import useLogin from '../../../src/features/auth/composables/use-login'

const { schema } = useLogin()

describe('useLogin validation schema', () => {
  it('validates a valid email and password', () => {
    const result = schema.safeParse({
      email: 'test@example.com',
      password: 'password123',
    })

    expect(result.success).toBe(true)
  })

  it('fails if email is invalid', () => {
    const result = schema.safeParse({
      email: 'invalid-email',
      password: 'password123',
    })

    expect(result.success).toBe(false)
    expect(result.error?.issues).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ message: 'El email no es válido.' }),
      ]),
    )
  })

  it('fails if password is too short', () => {
    const result = schema.safeParse({
      email: 'test@example.com',
      password: 'pw',
    })

    expect(result.success).toBe(false)
    expect(result.error?.issues).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          message: 'La contraseña debe tener al menos 3 caracteres.',
        }),
      ]),
    )
  })

  it('fails if email is empty', () => {
    const result = schema.safeParse({
      email: undefined,
      password: 'password123',
    })

    expect(result.success).toBe(false)
    expect(result.error?.issues).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ message: 'El email es requerido.' }),
      ]),
    )
  })

  it('fails if password is empty', () => {
    const result = schema.safeParse({
      email: 'test@example.com',
      password: undefined,
    })

    expect(result.success).toBe(false)
    expect(result.error?.issues).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ message: 'La contraseña es requerida.' }),
      ]),
    )
  })
})
