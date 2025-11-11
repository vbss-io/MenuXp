import { WHATSAPP_VERIFICATION_TTL_MS } from '@api/domain/consts/timeouts.const'

import { type WhatsAppVerificationMetadata, VerificationStatus } from './whatsapp-verification.schema'

export class WhatsAppVerification {
  codeHash: string
  status: VerificationStatus
  attempts: number
  expiresAt: Date
  language: string
  lastSentAt: Date
  metadata: WhatsAppVerificationMetadata

  private constructor(
    readonly id: string | undefined,
    readonly phone: string,
    readonly restaurantId: string,
    readonly customerId: string,
    codeHash: string,
    status: VerificationStatus,
    attempts: number,
    readonly maxAttempts: number,
    expiresAt: Date,
    language: string,
    lastSentAt: Date,
    metadata: WhatsAppVerificationMetadata,
    readonly createdAt?: Date,
    readonly updatedAt?: Date
  ) {
    this.codeHash = codeHash
    this.status = status
    this.attempts = attempts
    this.expiresAt = expiresAt
    this.language = language
    this.lastSentAt = lastSentAt
    this.metadata = metadata
  }

  static create(input: CreateWhatsAppVerification): WhatsAppVerification {
    const now = new Date()
    const expiresAt = new Date(now.getTime() + WHATSAPP_VERIFICATION_TTL_MS)
    return new WhatsAppVerification(
      undefined,
      input.phone,
      input.restaurantId,
      input.customerId,
      input.codeHash,
      VerificationStatus.PENDING,
      0,
      input.maxAttempts ?? 3,
      expiresAt,
      input.language ?? 'pt_BR',
      now,
      {
        requestIp: input.requestIp,
        resendCount: 0,
        userAgent: input.userAgent
      }
    )
  }

  static restore(input: RestoreWhatsAppVerification): WhatsAppVerification {
    return new WhatsAppVerification(
      input.id,
      input.phone,
      input.restaurantId,
      input.customerId,
      input.codeHash,
      input.status,
      input.attempts,
      input.maxAttempts,
      input.expiresAt,
      input.language,
      input.lastSentAt,
      input.metadata,
      input.createdAt,
      input.updatedAt
    )
  }

  isExpired(): boolean {
    return this.status === VerificationStatus.EXPIRED || new Date() > this.expiresAt
  }

  isVerified(): boolean {
    return this.status === VerificationStatus.VERIFIED
  }

  isPending(): boolean {
    return this.status === VerificationStatus.PENDING && !this.isExpired()
  }

  canAttempt(): boolean {
    return this.isPending() && this.attempts < this.maxAttempts
  }

  incrementAttempts(): void {
    this.attempts++
    if (this.attempts >= this.maxAttempts) {
      this.expire()
    }
  }

  verify(): void {
    if (!this.isPending()) {
      throw new Error('Verification is not in pending state')
    }
    this.status = VerificationStatus.VERIFIED
  }

  expire(): void {
    this.status = VerificationStatus.EXPIRED
  }

  markAsResent(newCodeHash: string): void {
    this.codeHash = newCodeHash
    this.attempts = 0
    this.lastSentAt = new Date()
    this.metadata.resendCount++
    this.expiresAt = new Date(Date.now() + WHATSAPP_VERIFICATION_TTL_MS)
  }
}

export interface CreateWhatsAppVerification {
  customerId: string
  phone: string
  restaurantId: string
  codeHash: string
  language?: string
  maxAttempts?: number
  requestIp?: string
  userAgent?: string
}

type RestoreWhatsAppVerification = {
  id: string
  phone: string
  restaurantId: string
  customerId: string
  codeHash: string
  status: VerificationStatus
  attempts: number
  maxAttempts: number
  expiresAt: Date
  language: string
  lastSentAt: Date
  metadata: WhatsAppVerificationMetadata
  createdAt: Date
  updatedAt: Date
}
