import { InMemoryRepository } from "../../../../shared/infra/db/in-memory-repository";
import { Equipment } from "../../../domain/equipment.entity";
import { EquipmentRepository } from "../../../domain/equipment.repository";

export class EquipmentInMemoryRepository extends InMemoryRepository<Equipment> implements EquipmentRepository {
  getEntity(): new (...args: any[]) => Equipment {
    return Equipment
  }
}