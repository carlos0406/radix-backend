import { test, describe, expect } from 'vitest'
import { Equipment } from './equipment.entity'

describe('EquipmentEntity', () => {
  test('should be create a Equipment', () => {
    const e = new Equipment({
      description: 'any_description',
    })
    expect(e.id).toBeDefined()
    expect(e.description).toBe('any_description')
    expect(e.created_at).toBeDefined()
  })

  test('should throw a error if description is empty', () => {
    expect(() => {
      const _ = new Equipment({
        //@ts-expect-error null description
        description: null,
      })
    }).toThrowError('equipment: description:Expected string, received null')
  })

  test('should throw a error if id is not a uuid', () => {
    expect(() => {
      const _ = new Equipment({
        id: 'any_id',
        description: "asasa",
      })
    }).toThrowError('equipment: id:Invalid uuid')
  })
})
