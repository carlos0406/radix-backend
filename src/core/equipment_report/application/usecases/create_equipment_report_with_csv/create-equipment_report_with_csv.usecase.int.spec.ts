import { test, expect, describe } from 'vitest'
import { Equipment } from '../../../../equipment/domain/equipment.entity'
import { CreateEquipmentReportWithCsvUsecase } from './create-equipment_report_with_csv.usecase';
import { createCsvBuffer, csvData } from '../../../../../../tests/fixtures/csv.fixture';
import { EquipmentPrismaRepository } from '../../../../equipment/infra/db/prisma/prisma-equipment.repository';
import { EquipmentReportPrismaRepository } from '../../../infra/db/prisma/equipment_report.prisma.repository';


describe('EquipmentReportUseCase', () => {
  test('should be create a EquipmentReport with csv', async () => {
    const input = csvData()
    const csv = createCsvBuffer(input)

    const equipmentRepository = new EquipmentPrismaRepository()
    for await (const item of input) {
       await equipmentRepository.insert(new Equipment({
        id: item.equipment_id,
        description: "descrição 1"
      }))
    }
    const equipmentReportRepository = new EquipmentReportPrismaRepository()
   
    const result =  await new CreateEquipmentReportWithCsvUsecase(equipmentReportRepository, equipmentRepository).execute(csv)
    expect(result).toBeDefined()
    expect(result.length).toBe(2)
  })
})
