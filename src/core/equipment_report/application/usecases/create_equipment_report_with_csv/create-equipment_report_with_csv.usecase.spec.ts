import { test, expect, describe } from 'vitest'
import { Equipment } from '../../../../equipment/domain/equipment.entity'
import { EquipmentInMemoryRepository } from '../../../../equipment/infra/db/in-memory/equipment.in-memory-repository,';
import { EquipmentReportInMemoryRepository } from '../../../infra/db/in-memory/equipment_report.in-memory-repository,';
import { CreateEquipmentReportWithCsvUsecase } from './create-equipment_report_with_csv.usecase';
import { createCsvBuffer, csvData } from '../../../../../../tests/fixtures/csv.fixture';


describe('EquipmentReportUseCase', () => {
  test('should be create a EquipmentReport', async () => {
    const input = csvData()
    const csv = createCsvBuffer(input)

    const equipmentRepository = new EquipmentInMemoryRepository()
    for await (const item of input) {
      await equipmentRepository.insert(new Equipment({
        id: item.equipment_id,
        description: "descrição 1"
      }))
    }

    const equipmentReportRepository = new EquipmentReportInMemoryRepository()
   
    const result =  await new CreateEquipmentReportWithCsvUsecase(equipmentReportRepository, equipmentRepository).execute(csv)
    expect(result).toBeDefined()
    expect(result.length).toBe(2)
  })
})
