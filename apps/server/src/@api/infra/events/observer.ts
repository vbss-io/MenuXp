import type { DomainEvent } from '@api/infra/events/domain-event'

export class Observable {
  private _observers: Array<{ eventName: string; callback: (event: DomainEvent<unknown>) => Promise<void> }>

  constructor() {
    this._observers = []
  }

  private get observers(): Array<{ eventName: string; callback: (event: DomainEvent<unknown>) => Promise<void> }> {
    if (!this._observers) {
      this._observers = []
    }
    return this._observers
  }

  register(eventName: string, callback: <Event>(event: DomainEvent<Event>) => Promise<void>): void {
    this.observers.push({ eventName, callback })
  }

  async notify<Event>(event: DomainEvent<Event>): Promise<void> {
    for (const observer of this.observers) {
      if (observer.eventName === event.eventName) {
        await observer.callback(event)
      }
    }
  }
}
