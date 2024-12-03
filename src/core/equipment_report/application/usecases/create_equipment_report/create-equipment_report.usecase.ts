import { EquipmentRepository } from "../../../../equipment/domain/equipment.repository";
import { EquipmentReport } from "../../../domain/equipment_report.entity";
import { EquipmentReportRepository } from "../../../domain/equipment_report.repository";
import { CreateEquipmentReportInput, CreateEquipmentReportSchema } from "../common/create-equipment_report.input";

export class CreateEquipmentReportUsecase {
  constructor (
    private equipmentReportRepository: EquipmentReportRepository,
    private equipmentRepository: EquipmentRepository
  ) {}

  async execute (input:CreateEquipmentReportInput): Promise<string> {
      const equipmentReport = new EquipmentReport(CreateEquipmentReportSchema.parse(input));
      const equipmentExists = await this.equipmentRepository.findById(equipmentReport.equipment_id);
      if (!equipmentExists) {
        throw new Error("Equipment not found");
      }
      await this.equipmentReportRepository.insert(equipmentReport);
      return equipmentReport.id
  }

  async validateIfEquipmentExists(equipmentId: string): Promise<boolean> {
    const equipment = await this.equipmentRepository.findById(equipmentId);
    return !!equipment;
  }
}