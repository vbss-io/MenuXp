import type { HttpClient } from '@api/infra/adapters/http/http-client.adapter'
import type { Logger } from '@api/infra/adapters/logger/logger.adapter'

export interface WhatsAppComponent {
  type: 'header' | 'body' | 'footer' | 'button'
  parameters?: Array<{
    type: 'text' | 'image' | 'currency' | 'date_time'
    text?: string
    image?: { link: string }
    currency?: { fallback_value: string; code: string; amount_1000: number }
    date_time?: {
      fallback_value: string
      day_of_week?: number
      year?: number
      month?: number
      day_of_month?: number
      hour?: number
      minute?: number
      calendar?: string
    }
  }>
}

export interface WhatsAppSendResult {
  success: boolean
  messageId?: string
  error?: {
    code: number
    message: string
  }
}

export interface SendTemplateMessageInput {
  phone: string
  template: string
  language: string
  components?: WhatsAppComponent[]
  correlationId: string
}

export interface WhatsAppMessagingClient {
  sendTemplateMessage(input: SendTemplateMessageInput): Promise<WhatsAppSendResult>
}

interface WhatsAppApiResponse {
  messages?: Array<{ id: string }>
  error?: {
    code: number
    message: string
    error_subcode?: number
    fbtrace_id?: string
  }
}

interface WhatsAppRequestBody {
  messaging_product: 'whatsapp'
  recipient_type: 'individual'
  to: string
  type: 'template'
  template: {
    name: string
    language: {
      code: string
    }
    components?: WhatsAppComponent[]
  }
}

const UNRECOVERABLE_ERROR_CODES = [470, 131047, 131031, 131026]
const RATE_LIMIT_JITTER_MS = 200

export class WhatsAppMessagingAdapter implements WhatsAppMessagingClient {
  private readonly baseUrl: string
  private readonly phoneNumberId: string
  private readonly accessToken: string

  constructor(
    private readonly httpClient: HttpClient,
    private readonly logger: Logger
  ) {
    this.baseUrl = process.env.WHATSAPP_API_BASE_URL ?? 'https://graph.facebook.com/v18.0'
    this.phoneNumberId = process.env.WHATSAPP_BUSINESS_NUMBER_ID ?? ''
    this.accessToken = process.env.WHATSAPP_ACCESS_TOKEN ?? ''
    if (!this.phoneNumberId || !this.accessToken) {
      this.logger.warn('WhatsApp credentials not configured', {
        hasPhoneNumberId: !!this.phoneNumberId,
        hasAccessToken: !!this.accessToken
      })
    }
  }

  async sendTemplateMessage(input: SendTemplateMessageInput): Promise<WhatsAppSendResult> {
    const { phone, template, language, components, correlationId } = input
    await this.applyRateLimitJitter()
    const url = `${this.baseUrl}/${this.phoneNumberId}/messages`
    const body: WhatsAppRequestBody = {
      messaging_product: 'whatsapp',
      recipient_type: 'individual',
      to: phone,
      type: 'template',
      template: {
        name: template,
        language: {
          code: language
        },
        ...(components && components.length > 0 ? { components } : {})
      }
    }
    const headers = {
      Authorization: `Bearer ${this.accessToken}`,
      'Content-Type': 'application/json'
    }
    const maskedPhone = this.maskPhone(phone)
    this.logger.info('Sending WhatsApp template message', {
      correlationId,
      phone: maskedPhone,
      template,
      language,
      hasComponents: !!components
    })
    try {
      const response = await this.httpClient.post<WhatsAppApiResponse>({
        url,
        body,
        headers
      })
      if (response.error) {
        const isUnrecoverable = UNRECOVERABLE_ERROR_CODES.includes(response.error.code)
        this.logger.error('WhatsApp API returned error', {
          correlationId,
          phone: maskedPhone,
          template,
          errorCode: response.error.code,
          errorMessage: response.error.message,
          isUnrecoverable
        })
        return {
          success: false,
          error: {
            code: response.error.code,
            message: response.error.message
          }
        }
      }
      if (response.messages && response.messages.length > 0) {
        const messageId = response.messages[0].id
        this.logger.info('WhatsApp template message sent successfully', {
          correlationId,
          phone: maskedPhone,
          template,
          messageId
        })
        return {
          success: true,
          messageId
        }
      }
      this.logger.error('WhatsApp API returned unexpected response format', {
        correlationId,
        phone: maskedPhone,
        template
      })
      return {
        success: false,
        error: {
          code: 0,
          message: 'Unexpected response format'
        }
      }
    } catch (error) {
      this.logger.error('WhatsApp API request failed', {
        correlationId,
        phone: maskedPhone,
        template,
        error: error instanceof Error ? error.message : 'Unknown error'
      })
      return {
        success: false,
        error: {
          code: 0,
          message: error instanceof Error ? error.message : 'Unknown error'
        }
      }
    }
  }

  private maskPhone(phone: string): string {
    if (phone.length <= 4) return '****'
    return `****${phone.slice(-4)}`
  }

  private async applyRateLimitJitter(): Promise<void> {
    const jitter = Math.random() * RATE_LIMIT_JITTER_MS
    return new Promise((resolve) => setTimeout(resolve, jitter))
  }
}
