import type { DomainEvent } from '@api/infra/events/domain-event'

interface Handler<T> {
  eventName: string
  callback: (event: DomainEvent<T>) => Promise<void>
}

export class Mediator {
  private handlers: Array<Handler<unknown>>

  constructor() {
    this.handlers = []
  }

  register<T>(eventName: string, callback: (event: DomainEvent<T>) => Promise<void>): void {
    this.handlers.push({ eventName, callback } as Handler<unknown>)
  }

  async publish<T>(eventName: string, event: DomainEvent<T>): Promise<void> {
    for (const handler of this.handlers) {
      if (handler.eventName === eventName) {
        await (handler as Handler<T>).callback(event)
      }
    }
  }
}
