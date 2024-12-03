import { EquipmentReportPrismaRepository } from './../../../infra/db/prisma/equipment_report.prisma.repository';
import { test, expect, describe } from 'vitest'
import { Equipment } from '../../../../equipment/domain/equipment.entity'
import { CreateEquipmentReportUsecase } from './create-equipment_report.usecase';
import { EquipmentPrismaRepository } from '../../../../equipment/infra/db/prisma/prisma-equipment.repository';

describe('CreateEquipmentReportUseCase integration ', () => {
  test('should be create a EquipmentReport', async () => {
    const e = new Equipment({
      description: 'Equipamento 1',
    })

    const equipmentRepository = new EquipmentPrismaRepository()
    await equipmentRepository.insert(e)

    const equipmentReportRepository = new EquipmentReportPrismaRepository()
    
    const result =  await new CreateEquipmentReportUsecase(equipmentReportRepository, equipmentRepository).execute({
      equipment_id: e.id,
      value: 10.2,
      timestamp: new Date(),
    })

    expect(result).toBeDefined()
  })
})
