import client from "../../../../../infra/db/prisma";
import { EquipmentReport } from "../../../domain/equipment_report.entity";
import { EquipmentReportRepository } from "../../../domain/equipment_report.repository";

export class EquipmentReportPrismaRepository implements EquipmentReportRepository {

  async getReportByEquipmentId(equipmentId: string, hours:number): Promise<EquipmentReport[]> {
    
    const currentTime = Date.now();
    const durationInMillis = hours * 60 * 60 * 1000;
    const minTimestamp = BigInt(currentTime - durationInMillis - 5000);

    const reports = await client.equipment_report.findMany({
      where: {
        equipment_id: equipmentId,
        timestamp: {
          gte: minTimestamp,
        },
      },
      orderBy: {
        timestamp: 'asc',
      },
    });

    return reports.map(report=>this.toEntity(report));
  }
  
  async insert(entity: EquipmentReport) {
   await client.equipment_report.create({
      data: this.toPrisma(entity)
    })
    return entity.id
  }

  async findById(id: string) {
    const db_report = await client.equipment_report.findUnique({
      where: {
        id: id
      }
    })
    if (!db_report) {
      return null
    }
    return this.toEntity(db_report)
  }

  async bulkInsert(entities: EquipmentReport[]): Promise<string[]> {
    const ids:string[] = []
    const input = entities.map(entity =>{
      ids.push(entity.id)
      return this.toPrisma(entity)
    })
    await client.$transaction(async (tx)=>{
      await tx.equipment_report.createMany({
        data: input
      })
    })


    return ids
  }

  async existsById(ids: string[]) {
    const db_reports_ids = await client.equipment_report.findMany({
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
      const db_report = db_reports_ids.find((db_report) => db_report.id === id)
      if (!db_report) {
        not_exists.push(id)
      } else {
        exists.push(id)
      }
    })
    return { exists, not_exists }
  }

  findAll(): Promise<EquipmentReport[]> {
    throw new Error("Method not implemented.");
  }

  toPrisma(entity: EquipmentReport) {
    return {
      id: entity.id,
      equipment_id: entity.equipment_id,
      value: entity.value,
      timestamp: entity.timestamp.getTime()
    }
  }

  toEntity(db_report: any): EquipmentReport {
    return new EquipmentReport(
      {
        id: db_report.id,
        equipment_id: db_report.equipment_id,
        value: Number(db_report.value),
        timestamp: new Date(Number(db_report.timestamp)),
      }
    )
  }
}