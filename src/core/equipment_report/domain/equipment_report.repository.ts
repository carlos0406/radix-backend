import { IRepository } from "../../shared/domain/repository.interface";
import { EquipmentReport } from "./equipment_report.entity";

export interface EquipmentReportRepository extends IRepository<EquipmentReport> {
  getReportByEquipmentId(equipmentId: string,hours:number): Promise<EquipmentReport[]>;
}