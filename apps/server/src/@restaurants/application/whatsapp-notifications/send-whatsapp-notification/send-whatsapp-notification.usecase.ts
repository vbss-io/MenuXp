import { randomBytes } from 'crypto'

import type { Logger } from '@api/infra/adapters/logger/logger.adapter'
import type {
  WhatsAppComponent,
  WhatsAppMessagingClient
} from '@api/infra/adapters/whatsapp/whatsapp-messaging.adapter'
import { inject } from '@api/infra/dependency-injection/registry'
import { WhatsAppTemplateKey } from '@restaurants/application/notifications/@types/whatsapp-templates.type'
import { OrderStatus } from '@restaurants/domain/orders/enums/order-status.enum'
import { DEFAULT_TEMPLATES } from '@restaurants/domain/restaurants/consts/default-templates.const'
import type { Restaurant } from '@restaurants/domain/restaurants/restaurant.entity'
import { WhatsAppNotificationLog } from '@restaurants/domain/whatsapp-notifications/whatsapp-notification-log.entity'
import {
  NotificationEventType,
  NotificationStatus
} from '@restaurants/domain/whatsapp-notifications/whatsapp-notification-log.schema'
import type { WhatsAppNotificationLogRepository } from '@restaurants/infra/repositories/whatsapp-notification-log.repository'

const DEFAULT_LANGUAGE = 'pt_BR'

const WHATSAPP_TEMPLATE_TO_RESTAURANT_TEMPLATE_MAP: Record<WhatsAppTemplateKey, string> = {
  [WhatsAppTemplateKey.ORDER_VERIFICATION_CODE]: 'order_verification_code',
  [WhatsAppTemplateKey.ORDER_SCHEDULED]: 'order_scheduled',
  [WhatsAppTemplateKey.ORDER_RECEIVED]: 'order_received',
  [WhatsAppTemplateKey.ORDER_CONFIRMED]: 'order_confirmed',
  [WhatsAppTemplateKey.ORDER_IN_PREPARATION]: 'order_in_production',
  [WhatsAppTemplateKey.ORDER_READY]: 'order_ready',
  [WhatsAppTemplateKey.ORDER_OUT_FOR_DELIVERY]: 'order_out_for_delivery',
  [WhatsAppTemplateKey.ORDER_DELIVERED]: 'order_delivered',
  [WhatsAppTemplateKey.ORDER_COMPLETED]: 'order_completed',
  [WhatsAppTemplateKey.ORDER_CANCELLED]: 'order_canceled'
}

export interface SendWhatsAppNotificationInput {
  orderId: string
  orderCode: string
  restaurantId: string
  customerPhone: string
  customerLanguage: string
  event: NotificationEventType
  templateKey: WhatsAppTemplateKey
  orderStatus?: OrderStatus
  cancelReason?: string
  scheduledFor?: Date
  total?: number
  attemptNumber?: number
}

export class SendWhatsAppNotificationUsecase {
  @inject('WhatsAppMessagingClient')
  private readonly whatsappClient!: WhatsAppMessagingClient

  @inject('WhatsAppNotificationLogRepository')
  private readonly notificationLogRepository!: WhatsAppNotificationLogRepository

  @inject('Logger')
  private readonly logger!: Logger

  async execute(input: SendWhatsAppNotificationInput, restaurant: Restaurant): Promise<void> {
    const correlationId = this.generateCorrelationId()
    const languageRequested = input.customerLanguage || DEFAULT_LANGUAGE
    const attemptNumber = input.attemptNumber ?? 1
    const resolvedTemplate = this.resolveMessageTemplate(input.templateKey, restaurant)
    if (!resolvedTemplate) {
      this.logger.warn('Message template not configured for WhatsApp notification', {
        correlationId,
        restaurantId: input.restaurantId,
        templateKey: input.templateKey,
        orderId: input.orderId
      })
      await this.logNotification({
        orderId: input.orderId,
        event: input.event,
        recipientPhone: input.customerPhone,
        languageRequested,
        languageUsed: languageRequested,
        templateName: input.templateKey,
        status: NotificationStatus.FAILED,
        attemptNumber,
        correlationId,
        errorCode: 'MESSAGE_TEMPLATE_NOT_CONFIGURED',
        errorMessage: `Message template ${input.templateKey} not configured`
      })
      throw new Error(`Message template ${input.templateKey} not configured for restaurant`)
    }
    const { template, source } = resolvedTemplate
    const components = this.buildTemplateComponents(template, input)
    const languageUsed = languageRequested
    const templateName = input.templateKey
    const isFallback = source === 'default'
    const sendResult = await this.whatsappClient.sendTemplateMessage({
      phone: input.customerPhone,
      template: templateName,
      language: languageUsed,
      components: components.length > 0 ? components : undefined,
      correlationId
    })
    if (!sendResult.success) {
      this.logger.error('Failed to send WhatsApp notification', {
        correlationId,
        orderId: input.orderId,
        orderCode: input.orderCode,
        phone: this.maskPhone(input.customerPhone),
        templateKey: input.templateKey,
        templateName,
        languageRequested,
        languageUsed,
        attemptNumber,
        errorCode: sendResult.error?.code,
        errorMessage: sendResult.error?.message
      })
      await this.logNotification({
        orderId: input.orderId,
        event: input.event,
        recipientPhone: input.customerPhone,
        languageRequested,
        languageUsed,
        templateName,
        status: NotificationStatus.FAILED,
        attemptNumber,
        correlationId,
        errorCode: sendResult.error?.code?.toString(),
        errorMessage: sendResult.error?.message
      })
      throw new Error(`Failed to send WhatsApp notification: ${sendResult.error?.message}`)
    }
    this.logger.info('WhatsApp notification sent successfully', {
      correlationId,
      orderId: input.orderId,
      orderCode: input.orderCode,
      phone: this.maskPhone(input.customerPhone),
      templateKey: input.templateKey,
      templateName,
      languageRequested,
      languageUsed,
      isFallback,
      attemptNumber
    })
    await this.logNotification({
      orderId: input.orderId,
      event: input.event,
      recipientPhone: input.customerPhone,
      languageRequested,
      languageUsed,
      templateName,
      status: isFallback ? NotificationStatus.FALLBACK : NotificationStatus.SENT,
      attemptNumber,
      correlationId
    })
  }

  private resolveMessageTemplate(
    templateKey: WhatsAppTemplateKey,
    restaurant: Restaurant
  ): { template: string; source: 'restaurant' | 'default' } | null {
    const restaurantTemplateKey = WHATSAPP_TEMPLATE_TO_RESTAURANT_TEMPLATE_MAP[templateKey] ?? templateKey
    const restaurantTemplate = restaurant.settings?.templates?.[restaurantTemplateKey]
    if (restaurantTemplate) {
      return {
        template: restaurantTemplate,
        source: 'restaurant'
      }
    }
    const defaultTemplate = DEFAULT_TEMPLATES[restaurantTemplateKey]
    if (defaultTemplate) {
      return {
        template: defaultTemplate,
        source: 'default'
      }
    }
    return null
  }

  private buildTemplateComponents(template: string, input: SendWhatsAppNotificationInput): WhatsAppComponent[] {
    const variables = this.extractTemplateVariables(template)
    if (variables.length === 0) {
      return []
    }
    const parameters = variables.map((variable) => ({
      type: 'text' as const,
      text: this.resolveVariableValue(variable, input)
    }))
    return [
      {
        type: 'body',
        parameters
      }
    ]
  }

  private extractTemplateVariables(template: string): string[] {
    return Array.from(template.matchAll(/#\{(.*?)\}/g)).map(([, variable]) => variable)
  }

  private resolveVariableValue(variable: string, input: SendWhatsAppNotificationInput): string {
    switch (variable) {
      case 'order_id':
        return input.orderCode
      case 'scheduled_for':
        return input.scheduledFor ? this.formatScheduledDate(input.scheduledFor) : '-'
      case 'cancel_reason':
        return input.cancelReason ?? 'Não especificado'
      default:
        return '-'
    }
  }

  private formatScheduledDate(date: Date): string {
    return new Intl.DateTimeFormat('pt-BR', {
      dateStyle: 'short',
      timeStyle: 'short',
      timeZone: 'America/Sao_Paulo'
    }).format(date)
  }

  private async logNotification(data: {
    orderId?: string
    event: NotificationEventType
    recipientPhone: string
    languageRequested: string
    languageUsed: string
    templateName: string
    status: NotificationStatus
    attemptNumber: number
    correlationId: string
    errorCode?: string
    errorMessage?: string
  }): Promise<void> {
    const log = WhatsAppNotificationLog.create({
      orderId: data.orderId,
      event: data.event,
      recipientPhone: data.recipientPhone,
      languageRequested: data.languageRequested,
      languageUsed: data.languageUsed,
      templateName: data.templateName,
      status: data.status,
      attemptNumber: data.attemptNumber,
      correlationId: data.correlationId,
      errorCode: data.errorCode,
      errorMessage: data.errorMessage
    })
    await this.notificationLogRepository.create(log)
  }

  private generateCorrelationId(): string {
    return randomBytes(16).toString('hex')
  }

  private maskPhone(phone: string): string {
    if (phone.length <= 4) return '****'
    return `****${phone.slice(-4)}`
  }
}
