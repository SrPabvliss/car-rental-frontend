import { describe, it, expect } from 'vitest'

describe('initial vitest test', () => {
  it('should work', () => {
    expect(true).toBe(true)
  })

  it('can handle basic math', () => {
    expect(1 + 1).toBe(2)
  })

  it('can work with arrays', () => {
    const arr = [1, 2, 3]
    expect(arr).toHaveLength(3)
    expect(arr).toContain(2)
  })

  it('can work with objects', () => {
    const obj = { name: 'test', value: 42 }
    expect(obj).toHaveProperty('name')
    expect(obj.value).toBe(42)
  })
})
