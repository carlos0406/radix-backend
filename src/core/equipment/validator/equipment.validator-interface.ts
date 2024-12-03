import { Equipment } from "../domain/equipment.entity";

export interface EquipmentValidatorInterface {
  validate: (e: Equipment) => void
}
