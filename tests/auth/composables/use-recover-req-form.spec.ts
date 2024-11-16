import { describe, it, expect } from 'vitest'

import useRecoverPasswordReq from '../../../src/features/auth/composables/use-recover-password'

const { schema } = useRecoverPasswordReq()

describe('useRecoverPasswordReq validation schema', () => {
  it('validates a valid email', () => {
    const result = schema.safeParse({ email: 'test@example.com' })
    expect(result.success).toBe(true)
  })

  it('fails if email is invalid', () => {
    const result = schema.safeParse({ email: 'invalid-email' })
    expect(result.success).toBe(false)
    expect(result.error?.issues).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ message: 'El email no es válido.' }),
      ]),
    )
  })

  it('fails if email is empty', () => {
    const result = schema.safeParse({ email: undefined })
    expect(result.success).toBe(false)
    expect(result.error?.issues).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ message: 'El email es requerido.' }),
      ]),
    )
  })
})
