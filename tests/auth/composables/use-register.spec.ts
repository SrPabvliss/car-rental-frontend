import { describe, it, expect } from 'vitest'

import useRegister from '../../../src/features/auth/composables/use-register'

const { schema } = useRegister()

describe('useRegister validation schema', () => {
  it('validates a valid input', () => {
    const result = schema.safeParse({
      name: 'John',
      lastName: 'Doe',
      email: 'test@example.com',
      password: 'password123',
      address: '123 Main St',
      role: 'Administrador',
      phone: '1234567890',
    })

    expect(result.success).toBe(true)
  })

  it('fails if a required field is missing', () => {
    const result = schema.safeParse({
      name: undefined,
      lastName: 'Doe',
      email: 'test@example.com',
      password: 'password123',
      address: '123 Main St',
      role: 'Admin',
      phone: '1234567890',
    })

    expect(result.success).toBe(false)
    expect(result.error?.issues).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ message: 'El nombre es requerido.' }),
      ]),
    )
  })
})
