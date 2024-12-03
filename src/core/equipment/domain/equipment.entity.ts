import { v4 as uuid } from 'uuid'
import { Entity } from '../../shared/domain/entity'
import { ZodReportValidator } from '../validator/equipment.zod-validator'
import NotificationError from '../../shared/notification/notification-error'
interface EquipmentProps {
  id?: string
  description: string
  created_at?: Date
}

export class Equipment extends Entity {
  private _id: string
  private _description: string
  private _created_at: Date

  get id (): string {
    return this._id
  }

  set id (value: string) {
    this._id = value
  }

  get description (): string {
    return this._description
  }

  set description (value: string) {
    this._description = value
  }

  get created_at (): Date {
    return this._created_at
  }

  set created_at (value: Date) {
    this._created_at = value
  }



  constructor ({
    id,
    description,
    created_at
    
  }: EquipmentProps) {
    super()
    this._id = id ?? uuid()
    this._created_at=created_at?? new Date()
    this._description = description
    this.validate()
    if (this.notification.hasErrors()) {
      throw new NotificationError(this.notification.getErros())
    }
  }
  
  validate () {
    const validator = new ZodReportValidator()
    validator.validate(this)
  }

}
