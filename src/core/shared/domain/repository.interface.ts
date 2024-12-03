import { Entity } from "./entity";

export interface IRepository<E extends Entity> {
  insert(entity: E): Promise<string>;
  findById(id: string): Promise<E | null>;
  bulkInsert(entities: E[]): Promise<string[]>;
  existsById(ids:string[]): Promise<{ exists: string[]; not_exists: string[] }>
  findAll(): Promise<E[]>;
}
