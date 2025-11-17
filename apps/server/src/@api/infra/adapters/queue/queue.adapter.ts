import { ONE_SECOND } from '@api/domain/consts/timeouts.const'
import { Logger } from '@api/infra/adapters/logger/logger.adapter'
import { inject } from '@api/infra/dependency-injection/registry'

import { QueueMessageStatus } from '@restaurants/domain/queues/enums/queue-message-status.enum'
import { QueueMessage } from '@restaurants/domain/queues/queue-message.entity'

export interface Queue {
  connect: () => Promise<void>
  register: (exchangeName: string, queueName: string) => Promise<void>
  publish: <T>(exchangeName: string, data: T, options?: { delay?: number }) => Promise<void>
  consume: <T>(queueName: string, callback: (data: T) => Promise<void>) => Promise<void>
}

export class InMemoryQueueAdapter implements Queue {
  private readonly isTestEnvironment = process.env.NODE_ENV === 'test'
  private readonly queues: Map<string, QueueMessage<unknown>[]>
  private readonly maxTries: number
  private readonly retryDelay: number
  private readonly consumers: Map<string, (data: unknown) => Promise<void>>
  private readonly intervals: Map<string, NodeJS.Timeout>
  private readonly processingFlags: Map<string, boolean>

  @inject('Logger')
  private readonly Logger!: Logger

  constructor(maxTries = 3, retryDelay = ONE_SECOND) {
    this.queues = new Map()
    this.consumers = new Map()
    this.intervals = new Map()
    this.processingFlags = new Map()
    this.maxTries = maxTries
    this.retryDelay = retryDelay
  }

  async connect(): Promise<void> {}

  async register(queueName: string): Promise<void> {
    if (!this.queues.has(queueName)) {
      this.queues.set(queueName, [])
    }
  }

  async publish<T>(queueName: string, data: T, options?: { delay?: number }): Promise<void> {
    if (this.queues.has(queueName)) {
      const queue = this.queues.get(queueName)
      if (queue) {
        const message = QueueMessage.create<T>({
          data,
          delay: options?.delay
        })
        queue.push(message)
      }
    } else {
      this.Logger.error(`Queue ${queueName} does not exist`)
    }
  }

  async consume<T>(queueName: string, callback: (data: T) => Promise<void>): Promise<void> {
    const baseQueueName = queueName.split('.')[0]
    this.Logger.info(`[QUEUE] Registering consumer for: ${queueName} (base: ${baseQueueName})`)
    if (!this.queues.has(baseQueueName)) {
      this.Logger.error(`Queue ${queueName} does not exist`)
      return
    }
    this.consumers.set(queueName, callback as (data: unknown) => Promise<void>)
    if (!this.intervals.has(baseQueueName) && !this.isTestEnvironment) {
      const interval = setInterval(() => {
        void this.processQueue(baseQueueName)
      }, this.retryDelay)
      this.intervals.set(baseQueueName, interval)
    } else {
      this.Logger.info(`[QUEUE] Queue processor already exists for: ${baseQueueName}`)
    }
  }

  private async processQueue(baseQueueName: string): Promise<void> {
    if (this.processingFlags.get(baseQueueName)) return
    const queue = this.queues.get(baseQueueName)
    if (!queue) return
    const pendingMessages = queue.filter((msg) => {
      const isPending = msg.status === 'pending' || (msg.status === 'error' && msg.attempts < this.maxTries)
      if (!isPending) return false
      if (msg.delay && msg.createdAt) {
        const timeSinceCreation = Date.now() - msg.createdAt.getTime()
        if (timeSinceCreation < msg.delay) return false
      }
      return true
    })
    if (pendingMessages.length === 0) return
    const message = pendingMessages[0]
    this.processingFlags.set(baseQueueName, true)
    try {
      if (message.status === 'error' && message.lastAttempt) {
        const timeSinceLastAttempt = Date.now() - message.lastAttempt.getTime()
        if (timeSinceLastAttempt < this.retryDelay) {
          return
        }
      }
      const consumer = this.findConsumerForMessage(baseQueueName)
      if (!consumer) {
        this.Logger.error(`No consumer found for message in queue: ${baseQueueName}`)
        return
      }
      this.Logger.info(`[QUEUE] Processing message ${message.id} for queue: ${baseQueueName}`)
      message.process()
      try {
        await consumer(message.data)
        message.complete()
        this.Logger.info(`[QUEUE] Message ${message.id} completed successfully`)
      } catch (error) {
        message.status = QueueMessageStatus.ERROR
        const errorMessage = error instanceof Error ? error.message : 'Unknown error'
        message.error(errorMessage)
        this.Logger.error(`[QUEUE] Message ${message.id} failed: ${message.errorMessage}`)
        if (message.attempts >= this.maxTries) {
          this.Logger.error(`Message ${message.id} failed after ${this.maxTries} attempts: ${message.errorMessage}`)
        }
      }
    } finally {
      this.processingFlags.set(baseQueueName, false)
    }
  }

  private findConsumerForMessage(baseQueueName: string): ((data: unknown) => Promise<void>) | null {
    this.Logger.info(`[QUEUE] Looking for consumer for base queue: ${baseQueueName}`)
    for (const [queueName, consumer] of this.consumers.entries()) {
      if (queueName === baseQueueName) {
        this.Logger.info(`[QUEUE] Found exact consumer match: ${queueName}`)
        return consumer
      }
    }
    for (const [queueName, consumer] of this.consumers.entries()) {
      if (queueName.startsWith(baseQueueName)) {
        this.Logger.info(`[QUEUE] Found prefix consumer match: ${queueName}`)
        return consumer
      }
    }
    this.Logger.error(`[QUEUE] No consumer found for base queue: ${baseQueueName}`)
    return null
  }
}
