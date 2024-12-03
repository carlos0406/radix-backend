import { test, expect, describe } from 'vitest'
import { Equipment } from '../../../../equipment/domain/equipment.entity'
import { EquipmentInMemoryRepository } from '../../../../equipment/infra/db/in-memory/equipment.in-memory-repository,';
import { EquipmentReportInMemoryRepository } from '../../../infra/db/in-memory/equipment_report.in-memory-repository,';
import { CreateEquipmentReportUsecase } from './create-equipment_report.usecase';

describe('EquipmentReportUseCase', () => {
  test('should be create a EquipmentReport', async () => {
    const e = new Equipment({
      description: 'Equipamento 1',
    })

    const equipmentRepository = new EquipmentInMemoryRepository()
    equipmentRepository.insert(e)

    const equipmentReportRepository = new EquipmentReportInMemoryRepository()
    
    const result =  await new CreateEquipmentReportUsecase(equipmentReportRepository, equipmentRepository).execute({
      equipment_id: e.id,
      value: 10.2,
      timestamp: new Date(),
    })

    expect(result).toBeDefined()
  })
})
