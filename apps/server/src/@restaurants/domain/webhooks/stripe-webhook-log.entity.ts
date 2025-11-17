export class StripeWebhookLog {
  eventId: string
  eventType: string
  payloadHash: string
  processedAt: Date
  status: 'success' | 'failed'
  errorMessage?: string
  retryCount: number

  private constructor(
    readonly id: string | undefined,
    eventId: string,
    eventType: string,
    payloadHash: string,
    processedAt: Date,
    status: 'success' | 'failed',
    errorMessage: string | undefined,
    retryCount: number,
    readonly createdAt?: Date,
    readonly updatedAt?: Date
  ) {
    this.eventId = eventId
    this.eventType = eventType
    this.payloadHash = payloadHash
    this.processedAt = processedAt
    this.status = status
    this.errorMessage = errorMessage
    this.retryCount = retryCount
  }

  static create(input: CreateStripeWebhookLog): StripeWebhookLog {
    return new StripeWebhookLog(
      undefined,
      input.eventId,
      input.eventType,
      input.payloadHash,
      new Date(),
      'success',
      undefined,
      0
    )
  }

  static restore(input: RestoreStripeWebhookLog): StripeWebhookLog {
    return new StripeWebhookLog(
      input.id,
      input.eventId,
      input.eventType,
      input.payloadHash,
      input.processedAt,
      input.status,
      input.errorMessage,
      input.retryCount,
      input.createdAt,
      input.updatedAt
    )
  }

  markAsFailed(errorMessage: string): void {
    this.status = 'failed'
    this.errorMessage = errorMessage
    this.retryCount += 1
  }

  markAsSuccess(): void {
    this.status = 'success'
    this.errorMessage = undefined
  }

  isProcessed(): boolean {
    return this.status === 'success'
  }

  canRetry(): boolean {
    return this.retryCount < 3
  }
}

export interface CreateStripeWebhookLog {
  eventId: string
  eventType: string
  payloadHash: string
}

interface RestoreStripeWebhookLog extends CreateStripeWebhookLog {
  id: string
  processedAt: Date
  status: 'success' | 'failed'
  errorMessage?: string
  retryCount: number
  createdAt: Date
  updatedAt: Date
}
