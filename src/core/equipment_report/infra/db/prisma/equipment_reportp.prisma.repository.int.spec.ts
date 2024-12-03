import { EquipmentReportPrismaRepository } from './equipment_report.prisma.repository';
import { EquipmentReport } from '../../../domain/equipment_report.entity';
import client from '../../../../../infra/db/prisma';
import {describe, beforeAll,beforeEach, afterAll,it, expect} from 'vitest'
import {v4 as uuid} from 'uuid'

describe('EquipmentReportPrismaRepository Integration Tests', () => {
  let repository: EquipmentReportPrismaRepository;

  beforeAll(async () => {
    repository = new EquipmentReportPrismaRepository();
  });

  beforeEach(async () => {
    // Clear existing data before each test
    await client.equipment_report.deleteMany();
  });

  afterAll(async () => {
    await client.$disconnect();
  });

  describe('insert method', () => {
    it('should successfully insert a report', async () => {
      const equipment = await client.equipment.create({
        data: {
          description: 'Test Equipment',
        }
      })
      const report = new EquipmentReport({
        id: uuid(),
        equipment_id: equipment.id,
        value: 100.5,
        timestamp: new Date()
      });

      const insertedId = await repository.insert(report);
      expect(insertedId).toBe(report.id);

      const foundReport = await repository.findById(report.id);
      expect(foundReport).toBeTruthy();
      expect(foundReport?.value).toBe(report.value);
    });
  });

  describe('bulkInsert method', () => {
    it('should successfully insert multiple reports', async () => {
      const equipment = await client.equipment.create({
        data: {
          description: 'Test Equipment',
        }
      })
      const reports = [
        new EquipmentReport({
          id: uuid(),
          equipment_id: equipment.id,
          value: 100.5,
          timestamp: new Date()
        }),
        new EquipmentReport({
          id: uuid(),
          equipment_id: equipment.id,
          value: 200.5,
          timestamp: new Date()
        })
      ];

      const insertedIds = await repository.bulkInsert(reports);
      expect(insertedIds).toEqual([reports[0].id, reports[1].id]);

      const { exists } = await repository.existsById(insertedIds);
      expect(exists).toEqual(insertedIds);
    });
  });

  describe('getReportByEquipmentId method', () => {
    it('should retrieve reports within specified time range', async () => {
      const now = new Date();
      const equipment = await client.equipment.create({
        data: {
          description: 'Test Equipment',
        }
      })
      
      const reports = [
        new EquipmentReport({
          id: uuid(),
          equipment_id: equipment.id,
          value: 100.5,
          timestamp: new Date(now.getTime() - 2 * 60 * 60 * 1000) // 2 hours ago
        }),
        new EquipmentReport({
          id: uuid(),
          equipment_id: equipment.id,
          value: 200.5,
          timestamp: new Date(now.getTime() - 30 * 60 * 1000) // 30 minutes ago
        }),
        new EquipmentReport({
          id: uuid(),
          equipment_id: equipment.id,
          value: 300.5,
          timestamp: new Date(now.getTime() + 30 * 60 * 1000) // 30 minutes in future
        })
      ];

      await repository.bulkInsert(reports);

      const retrievedReports = await repository.getReportByEquipmentId(equipment.id, 2);
      expect(retrievedReports.length).toBe(3);
    });
  });

  describe('existsById method', () => {
    it('should correctly identify existing and non-existing reports', async () => {
      const equipment = await client.equipment.create({
        data: {
          description: 'Test Equipment',
        }
      })
     
      const reports = [
        new EquipmentReport({
          id: uuid(),
          equipment_id: equipment.id,
          value: 100.5,
          timestamp: new Date()
        }),
        new EquipmentReport({
          id: uuid(),
          equipment_id: equipment.id,
          value: 200.5,
          timestamp: new Date()
        })
      ];

      await repository.bulkInsert(reports);
      const not_exist = uuid()
      const ids = reports.map(report => report.id)
      const { exists, not_exists } = await repository.existsById([...ids, not_exist]);
      expect(exists).toEqual(ids);
      expect(not_exists).toEqual([not_exist]);
    });
  });
});