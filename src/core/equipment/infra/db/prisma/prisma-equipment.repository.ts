import client from "../../../../../infra/db/prisma";
import { Equipment } from "../../../domain/equipment.entity";
import { EquipmentRepository } from "../../../domain/equipment.repository";

export class EquipmentPrismaRepository implements EquipmentRepository {

  async insert(entity: Equipment) {
    await client.equipment.create({
      data: this.toPrisma(entity)
    })
    return entity.id
  }

  async findById(id: string) {
    const db_equipment = await client.equipment.findUnique({
      where: {
        id: id
      }
    })
    if (!db_equipment) {
      return null
    }
    return this.toEntity(db_equipment)
  }

  async bulkInsert(entities: Equipment[]): Promise<string[]> {
    const ids: string[] = []
    const input = entities.map(entity => {
      ids.push(entity.id)
      return this.toPrisma(entity)
    })
    
    await client.$transaction(async (tx) => {
      await tx.equipment.createMany({
        data: input
      })
    })

    return ids
  }

  async existsById(ids: string[]) {
    const db_equipments_ids = await client.equipment.findMany({
      select: {
        id: true
      },
      where: {
        id: {
          in: ids
        }
      }
    })
    const exists: string[] = []
    const not_exists: string[] = []
    ids.forEach(id => {
      const db_equipment = db_equipments_ids.find(db_equipment => db_equipment.id === id)
      if (db_equipment) {
        exists.push(id)
      } else {
        not_exists.push(id)
      }
    })
    return { exists, not_exists }
    
  }

  async findAll() {
    const db_equipments = await client.equipment.findMany({
      orderBy:{
        created_at: 'desc'
      }
    })
    return db_equipments.map(db_equipment => this.toEntity(db_equipment))
  }

  toPrisma(entity: Equipment) {
    return {
      id: entity.id,
      description: entity.description,
      created_at: entity.created_at,
    }
  }


  toEntity(db_equipment: any): Equipment {
    return new Equipment({
      id: db_equipment.id,
      description: db_equipment.description,
      created_at: db_equipment.created_at
    })
    
  }
}