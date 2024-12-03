import { EquipmentPrismaRepository } from './prisma-equipment.repository';
import { describe, it, expect, beforeEach, beforeAll, afterAll } from 'vitest';
import { v4 as uuid } from 'uuid';
import { Equipment } from '../../../domain/equipment.entity';
import client from '../../../../../infra/db/prisma';

describe('EquipmentPrismaRepository Integration Tests', () => {
  let repository: EquipmentPrismaRepository;

  beforeAll(async () => {
    repository = new EquipmentPrismaRepository();
  });

  beforeEach(async () => {
    await client.equipment.deleteMany();
  });

  afterAll(async () => {
    await client.$disconnect();
  });

  describe('insert method', () => {
    it('should successfully insert an equipment', async () => {
      const equipment = new Equipment({
        id: uuid(),
        description: 'Test Equipment',
        created_at: new Date()
      });

      const insertedId = await repository.insert(equipment);
      expect(insertedId).toBe(equipment.id);

      const foundEquipment = await repository.findById(equipment.id);
      expect(foundEquipment).toBeTruthy();
      expect(foundEquipment?.description).toBe(equipment.description);
    });
  });

  describe('bulkInsert method', () => {
    it('should successfully insert multiple equipments', async () => {
      const equipments = [
        new Equipment({
          description: 'Equipment 1',
        }),
        new Equipment({
          description: 'Equipment 2',
        })
      ];

      const insertedIds = await repository.bulkInsert(equipments);
      expect(insertedIds.length).toBe(2);

      const { exists } = await repository.existsById(insertedIds);
      expect(exists).toEqual(insertedIds);
    });
  });

  describe('findAll method', () => {
    it('should retrieve all equipments sorted by creation date', async () => {
      const equipments = [
        new Equipment({
          id: uuid(),
          description: 'Equipment 1',
          created_at: new Date('2023-01-01')
        }),
        new Equipment({
          id: uuid(),
          description: 'Equipment 2',
          created_at: new Date('2023-02-01')
        })
      ];

      await repository.bulkInsert(equipments);

      const retrievedEquipments = await repository.findAll();
      expect(retrievedEquipments.length).toBe(2);
      // Check if sorted by creation date in descending order
      expect(retrievedEquipments[0].description).toBe('Equipment 2');
      expect(retrievedEquipments[1].description).toBe('Equipment 1');
    });
  });

  describe('existsById method', () => {
    it('should correctly identify existing and non-existing equipments', async () => {
      const equipments = [
        new Equipment({
          id: uuid(),
          description: 'Equipment 1',
          created_at: new Date()
        }),
        new Equipment({
          id: uuid(),
          description: 'Equipment 2',
          created_at: new Date()
        })
      ];

      const insertedIds = await repository.bulkInsert(equipments);
      const not_exist = uuid()
      const { exists, not_exists } = await repository.existsById([...insertedIds, not_exist]);
      expect(exists).toEqual(insertedIds);
      expect(not_exists).toEqual([not_exist]);
    });
  });
});