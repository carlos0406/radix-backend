import { test, describe } from 'vitest'
import { Equipment } from './equipment.entity'

describe('EquipmentEntity', () => {
  test('should be create a Equipment', () => {
    new Equipment({
      description: 'any_description',
    })
  })
})
