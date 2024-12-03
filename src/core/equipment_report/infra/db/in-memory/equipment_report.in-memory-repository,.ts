import { EquipmentReportRepository } from './../../../domain/equipment_report.repository';
import { InMemoryRepository } from "../../../../shared/infra/db/in-memory-repository";
import { EquipmentReport } from "../../../domain/equipment_report.entity";

export class EquipmentReportInMemoryRepository extends InMemoryRepository<EquipmentReport> implements EquipmentReportRepository {
  async getReportByEquipmentId(equipmentId: string, hours:number): Promise<EquipmentReport[]> {
    const currentTime = BigInt(Date.now());
    const durationInMillis = BigInt(hours * 60 * 60 * 1000);
    //adiciona  margem de erro de 5 segundos
    const minTimestamp = currentTime - durationInMillis - BigInt(5000);

    return this.items
      .filter(
        (report) =>
          report.equipment_id === equipmentId && report.timestamp.getTime() >= minTimestamp
      )
      .sort((a, b) => Number(a.timestamp.getTime() - b.timestamp.getTime()));
  }
  getEntity(): new (...args: any[]) => EquipmentReport {
    return EquipmentReport
  }
}