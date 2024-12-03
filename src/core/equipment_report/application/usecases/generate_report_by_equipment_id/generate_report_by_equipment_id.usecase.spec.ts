import { test, expect, describe } from 'vitest';
import { Equipment } from '../../../../equipment/domain/equipment.entity';
import { EquipmentReport } from '../../../domain/equipment_report.entity';
import { GenerateReportInput } from './generate_report.input';
import { EquipmentInMemoryRepository } from '../../../../equipment/infra/db/in-memory/equipment.in-memory-repository,';
import { EquipmentReportInMemoryRepository } from '../../../infra/db/in-memory/equipment_report.in-memory-repository,';
import { GenerateEquipmentReport } from './generate_report_by_equipment_id.usecase';

describe('GenerateEquipmentReport Use Case', () => {
  test('should fetch equipment reports filtered by hours', async () => {
    const equipmentRepository = new EquipmentInMemoryRepository();
    const equipmentReportRepository = new EquipmentReportInMemoryRepository();

    const equipment1 = new Equipment({ description: 'Test Equipment' });
    await equipmentRepository.insert(equipment1);

    const now = new Date();
    const oneHourAgo = new Date(now.getTime() - 1 * 60 * 60 * 1000);
    const twoHoursAgo = new Date(now.getTime() - 2 * 60 * 60 * 1000);
    const threeHoursAgo = new Date(now.getTime() - 3 * 60 * 60 * 1000);

    const report1 = new EquipmentReport({
      equipment_id: equipment1.id,
      value: 100,
      timestamp: oneHourAgo,
    });

    const report2 = new EquipmentReport({
      equipment_id: equipment1.id,
      value: 200,
      timestamp: twoHoursAgo,
    });

    const report3 = new EquipmentReport({
      equipment_id: equipment1.id,
      value: 300,
      timestamp: threeHoursAgo,
    });

    await equipmentReportRepository.bulkInsert([report1, report2, report3]);

    const useCase = new GenerateEquipmentReport(equipmentReportRepository);

    const input: GenerateReportInput = {
      equipment_id: equipment1.id,
      hours: 2,
    };

    const result = await useCase.execute(input);


    expect(result).toHaveLength(2);
    expect(result).toEqual([
      { id: report2.id, value: 200, timestamp: report2.timestamp },
      { id: report1.id, value: 100, timestamp: report1.timestamp },
    ]);
  });
});