import { v4 as uuid } from 'uuid'
import { Entity } from '../../shared/domain/entity'
import { ZodReportValidator } from '../validator/report.zod-validator'
import NotificationError from '../../shared/notification/notification-error'
interface EquipmentReportProps {
  id?: string
  value: number
  timestamp: Date
  equipment_id: string
}

export class EquipmentReport extends Entity {
  private _id: string
  private _equipment_id: string
  private _timestamp: Date
  private _value: number	

  get id (): string {
    return this._id
  }

  set id (value: string) {
    this._id = value
  }

  get equipment_id (): string {
    return this._equipment_id
  }

  set equipment_id (value: string) {
    this._equipment_id = value
  }
  get timestamp (): Date {
    return this._timestamp
  }
  set timestamp (value: Date) {
    this._timestamp = value
  }
  get value (): number {
    return this._value
  }
  set value (value: number) {
    this._value = value
  }

  constructor ({
    id,
    equipment_id,
    timestamp,
    value
  }: EquipmentReportProps) {
    super()
    this._id = id ?? uuid()
    this._equipment_id = equipment_id
    this._timestamp = timestamp
    this._value =  value
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
