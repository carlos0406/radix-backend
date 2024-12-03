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

  test('should throw a error if equipment_id is empty', () => {
    expect(() => {
      const _ = new EquipmentReport({
        //@ts-expect-error null equipment_id
        equipment_id: null,
        timestamp: new Date(),
        value: 100,
      })
    }).toThrowError('report: equipment_id:Expected string, received null')
  })

  test('should throw a error if timestamp is empty', () => {
    expect(() => {
      const _ = new EquipmentReport({
        equipment_id: uuid(),
        //@ts-expect-error null timestamp
        timestamp: null,
        value: 100,
      })
    }).toThrowError('report: timestamp:Expected date, received null')
  })
  test('should throw a error if value is empty', () => {
    expect(() => {
      const _ = new EquipmentReport({
        equipment_id: uuid(),
        timestamp: new Date(),
        //@ts-expect-error null value
        value: null,
      })
    }).toThrowError('report: value:Expected number, received null')
  })

})
