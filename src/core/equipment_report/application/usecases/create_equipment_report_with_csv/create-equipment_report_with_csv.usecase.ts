import { Readable } from "stream";
import * as csv from 'csv-parse';
import { EquipmentRepository } from "../../../../equipment/domain/equipment.repository";
import { EquipmentReport } from "../../../domain/equipment_report.entity";
import { EquipmentReportRepository } from "../../../domain/equipment_report.repository";

export class CreateEquipmentReportWithCsvUsecase {
  constructor (
    private equipmentReportRepository: EquipmentReportRepository,
    private equipmentRepository: EquipmentRepository
  ) {}

  async execute (fileBuffer: Buffer): Promise<string[]> {
    const reports: EquipmentReport[] = [];
    const bufferStream = new Readable();
    bufferStream.push(fileBuffer);
    bufferStream.push(null);
    const equipaments_not_exists: string[] = []

    const parser = bufferStream.pipe(
      csv.parse({
        columns: true,
        trim: true,
        skip_empty_lines: true
      })
    );

    try {
      for await (const row of parser) {
        try {
          const equipmentExists = await this.validateIfEquipmentExists(row.equipment_id);
          if (!equipmentExists) {
            equipaments_not_exists.push(row.equipment_id);
          }
          const equipmentReport = new EquipmentReport({
            equipment_id: row.equipment_id,
            timestamp: new Date(row.timestamp),
            value: parseFloat(row.value)
          });

          reports.push(equipmentReport);
          
        } catch (lineError) {
          console.error(`Erro ao processar linha: ${JSON.stringify(row)}`, lineError);
        }
      }
      
      return await this.equipmentReportRepository.bulkInsert(reports);
    } catch (parseError:any) {
      throw new Error(`Erro ao processar arquivo CSV: ${parseError.message}`);
    }

    
    return []
  }

  async validateIfEquipmentExists(equipmentId: string): Promise<boolean> {
    const equipment = await this.equipmentRepository.findById(equipmentId);
    return !!equipment;
  }
}