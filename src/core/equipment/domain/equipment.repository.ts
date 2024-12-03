import { IRepository } from "../../shared/domain/repository.interface";
import { Equipment } from "./equipment.entity";

export interface EquipmentRepository extends IRepository<Equipment> {}