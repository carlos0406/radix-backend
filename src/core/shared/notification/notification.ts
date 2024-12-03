export type NotificationErrorProps = {
  message: string
  context: string
}

export class Notification {
  private readonly errors: NotificationErrorProps[] = []

  addError (error: NotificationErrorProps): void {
    this.errors.push(error)
  }

  messages (context?: string): string {
    const messages = this.errors
      .filter(error => context ? error.context === context : true)
      .map(error => `${error.context}: ${error.message}`)
    return messages.join(',')
  }

  hasErrors (): boolean {
    return this.errors.length > 0
  }

  getErros (): NotificationErrorProps[] {
    return this.errors
  }
}