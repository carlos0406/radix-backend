import { Entity } from "../../domain/entity";
import { IRepository } from "../../domain/repository.interface";

export abstract class InMemoryRepository<
  E extends Entity,
> implements IRepository<E>
{
  items: E[] = [];
  async findByIds(ids: string[]): Promise<E[]> {
    return this.items.filter((entity) => {
      return ids.some((id) => entity.id === id);
    });
  }

  
  async insert(entity: E) {
    this.items.push(entity);
    return entity.id;
  }

  async bulkInsert(entities: E[]): Promise<string[]> {
    return entities.map((entity) => {
      this.insert(entity)
      return entity.id
    });
  }

  async findById(id: string): Promise<E | null> {
    const entity = this.items.find((item) => item.id === id);
    if (!entity) {
      return null;
    }
    return entity;
  }

  async existsById(ids: string[]){
    const exists: string[] = []
    const not_exists: string[] = []
    ids.forEach(id => {
      const entity = this.items.find((item) => item.id === id);
      if (!entity) {
        not_exists.push(id)
      } else {
        exists.push(id)
      }
    })
    return { exists, not_exists }
  }

  async findAll(): Promise<E[]> {
    return this.items;
  }
  
  abstract getEntity(): new (...args: any[]) => E;
}
