import { EquipmentReport } from "../domain/equipment_report.entity";

export interface ReportValidatorInterface {
  validate: (r: EquipmentReport) => void
}
