import { EquipmentReport } from "../../../domain/equipment_report.entity";
import { EquipmentReportRepository } from "../../../domain/equipment_report.repository";
import { GenerateReportInput } from "./generate_report.input";

export class GenerateEquipmentReport {
  constructor (
    private equipmentReportRepository: EquipmentReportRepository,
  ) {}

  async execute (input:GenerateReportInput) {
    const result =  await this.equipmentReportRepository.getReportByEquipmentId(input.equipment_id, input.hours)
    return this.toOutput(result)
  }

  toOutput (result : EquipmentReport[]){
    return result.map((item) => {
      return {
        id: item.id,
        value: item.value,
        timestamp: item.timestamp,
      }
    })
  }
  
}