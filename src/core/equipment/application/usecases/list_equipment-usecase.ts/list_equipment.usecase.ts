import { Equipment } from '../../../domain/equipment.entity';
import { EquipmentRepository } from './../../../domain/equipment.repository';
export class ListEquipmentUseCase{
  constructor(private readonly equipmentRepository: EquipmentRepository) { }
  async execute() {
    const equipments = await this.equipmentRepository.findAll()
    return equipments.map(e=>this.toOutput(e))
  }

  toOutput(equipment: Equipment) {
    return {
      id: equipment.id,
      description: equipment.description,
      created_at: equipment.created_at,
    }
  }
}