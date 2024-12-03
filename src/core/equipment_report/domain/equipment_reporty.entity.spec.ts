import { test, expect, describe } from 'vitest'
import { EquipmentReport } from './equipment_report.entity'
import {v4 as uuid} from 'uuid'

describe('ReportEntity', () => {
  test('should be create a Category', () => {
    const data = new Date()
    const r = new EquipmentReport({
      equipment_id: uuid(),
      timestamp: data,
      value: 100,
    })
    expect(r.id).toBeDefined()
    expect(r.equipment_id).toBeDefined()
    expect(r.timestamp).toBe(data)
    expect(r.value).toBe(100)
  })

})
