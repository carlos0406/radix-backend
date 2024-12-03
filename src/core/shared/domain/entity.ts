import { Notification } from "../notification/notification"

export abstract class Entity {
  public notification: Notification
  constructor () {
    this.notification = new Notification()
  }
  abstract get id(): string
}