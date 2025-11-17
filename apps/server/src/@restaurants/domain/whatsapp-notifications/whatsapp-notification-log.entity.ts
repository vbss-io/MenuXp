import { type NotificationEventType, NotificationStatus } from './whatsapp-notification-log.schema'

export class WhatsAppNotificationLog {
  event: NotificationEventType
  recipientPhone: string
  languageRequested: string
  languageUsed: string
  templateName: string
  status: NotificationStatus
  errorCode?: string
  errorMessage?: string
  attemptNumber: number
  correlationId: string
  timestamp: Date

  private constructor(
    readonly id: string | undefined,
    readonly orderId: string | undefined,
    event: NotificationEventType,
    recipientPhone: string,
    languageRequested: string,
    languageUsed: string,
    templateName: string,
    status: NotificationStatus,
    attemptNumber: number,
    correlationId: string,
    timestamp: Date,
    errorCode?: string,
    errorMessage?: string,
    readonly createdAt?: Date,
    readonly updatedAt?: Date
  ) {
    this.event = event
    this.recipientPhone = recipientPhone
    this.languageRequested = languageRequested
    this.languageUsed = languageUsed
    this.templateName = templateName
    this.status = status
    this.attemptNumber = attemptNumber
    this.correlationId = correlationId
    this.timestamp = timestamp
    this.errorCode = errorCode
    this.errorMessage = errorMessage
  }

  static create(input: CreateWhatsAppNotificationLog): WhatsAppNotificationLog {
    return new WhatsAppNotificationLog(
      undefined,
      input.orderId,
      input.event,
      input.recipientPhone,
      input.languageRequested,
      input.languageUsed,
      input.templateName,
      input.status,
      input.attemptNumber ?? 1,
      input.correlationId,
      new Date(),
      input.errorCode,
      input.errorMessage
    )
  }

  static restore(input: RestoreWhatsAppNotificationLog): WhatsAppNotificationLog {
    return new WhatsAppNotificationLog(
      input.id,
      input.orderId,
      input.event,
      input.recipientPhone,
      input.languageRequested,
      input.languageUsed,
      input.templateName,
      input.status,
      input.attemptNumber,
      input.correlationId,
      input.timestamp,
      input.errorCode,
      input.errorMessage,
      input.createdAt,
      input.updatedAt
    )
  }

  isSent(): boolean {
    return this.status === NotificationStatus.SENT
  }

  isFailed(): boolean {
    return this.status === NotificationStatus.FAILED
  }

  isFallback(): boolean {
    return this.status === NotificationStatus.FALLBACK
  }

  hasError(): boolean {
    return this.errorCode !== undefined || this.errorMessage !== undefined
  }
}

export interface CreateWhatsAppNotificationLog {
  orderId?: string
  event: NotificationEventType
  recipientPhone: string
  languageRequested: string
  languageUsed: string
  templateName: string
  status: NotificationStatus
  attemptNumber?: number
  correlationId: string
  errorCode?: string
  errorMessage?: string
}

interface RestoreWhatsAppNotificationLog {
  id: string
  orderId?: string
  event: NotificationEventType
  recipientPhone: string
  languageRequested: string
  languageUsed: string
  templateName: string
  status: NotificationStatus
  attemptNumber: number
  correlationId: string
  timestamp: Date
  errorCode?: string
  errorMessage?: string
  createdAt: Date
  updatedAt: Date
}
