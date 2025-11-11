import { compare, hash } from 'bcryptjs'
import { randomBytes } from 'crypto'

import { BadRequestError, UnauthorizedError } from '@api/domain/errors'
import type { Cache } from '@api/infra/adapters/cache/cache.adapter'
import type { Logger } from '@api/infra/adapters/logger/logger.adapter'
import type { WhatsAppMessagingClient } from '@api/infra/adapters/whatsapp/whatsapp-messaging.adapter'
import { WhatsAppVerification } from '@customers/domain/whatsapp-verifications/whatsapp-verification.entity'
import type { WhatsAppVerificationRepository } from '@customers/infra/repositories/whatsapp-verification.repository'

const CODE_HASH_SALT_ROUNDS = 10
const VERIFICATION_TOKEN_TTL_MS = 600000
const RESEND_COOLDOWN_MS = 60000
const VERIFICATION_TEMPLATE_NAME = 'order_verification_code'

export interface VerificationRequestParams {
  phone: string
  restaurantId: string
  customerId: string
  language?: string
  requestIp?: string
  userAgent?: string
}

export interface VerificationRequestResult {
  verificationId: string
  expiresInSeconds: number
}

export interface VerificationVerifyParams {
  customerId?: string
  verificationId: string
  code: string
}

export interface VerificationVerifyResult {
  verificationToken: string
  expiresInSeconds: number
}

interface VerificationTokenData {
  customerId?: string
  restaurantId: string
  phone: string
  issuedAt: number
}

export interface VerificationCodeService {
  requestCode(params: VerificationRequestParams): Promise<VerificationRequestResult>
  resendCode(params: VerificationRequestParams, verificationId: string): Promise<VerificationRequestResult>
  verifyCode(params: VerificationVerifyParams): Promise<VerificationVerifyResult>
  validateToken(token: string): VerificationTokenData | null
  invalidate(verificationId: string): Promise<void>
}

export class VerificationCodeServiceImpl implements VerificationCodeService {
  constructor(
    private readonly verificationRepository: WhatsAppVerificationRepository,
    private readonly whatsappClient: WhatsAppMessagingClient,
    private readonly cache: Cache,
    private readonly logger: Logger
  ) {}

  async requestCode({ phone, restaurantId, customerId, language = 'pt_BR', requestIp, userAgent }: VerificationRequestParams): Promise<VerificationRequestResult> {
    const correlationId = this.generateCorrelationId()
    await this.invalidatePendingVerifications(phone, restaurantId)
    // const code = this.generateCode() // To-Do: Remove this after testing
    const code = '123456'
    const codeHash = await this.hashCode(code)
    const verification = WhatsAppVerification.create({
      phone,
      restaurantId,
      customerId,
      codeHash,
      language,
      requestIp,
      userAgent
    })
    const saved = await this.verificationRepository.create(verification)
    // To-Do: Uncomment this after testing
    // const sendResult = await this.whatsappClient.sendTemplateMessage({
    //   phone,
    //   template: VERIFICATION_TEMPLATE_NAME,
    //   language,
    //   components: [
    //     {
    //       type: 'body',
    //       parameters: [
    //         { type: 'text', text: code },
    //         { type: 'text', text: '10' }
    //       ]
    //     }
    //   ],
    //   correlationId
    // })
    // if (!sendResult.success) {
    //   this.logger.error('Failed to send verification code via WhatsApp', {
    //     correlationId,
    //     verificationId: saved.id,
    //     phone: this.maskPhone(phone),
    //     errorCode: sendResult.error?.code,
    //     errorMessage: sendResult.error?.message
    //   })
    //   throw new BadRequestError('Failed to send verification code')
    // }
    this.logger.info('Verification code requested successfully', {
      correlationId,
      verificationId: saved.id,
      phone: this.maskPhone(phone),
      restaurantId,
      language
    })
    return {
      verificationId: saved.id!,
      expiresInSeconds: Math.floor(VERIFICATION_TOKEN_TTL_MS / 1000)
    }
  }

  async resendCode(
    params: VerificationRequestParams,
    verificationId: string
  ): Promise<VerificationRequestResult> {
    const { phone, restaurantId, language = 'pt_BR' } = params
    const correlationId = this.generateCorrelationId()
    const verification = await this.verificationRepository.findById(verificationId)
    if (!verification) {
      throw new BadRequestError('Verification not found')
    }
    if (verification.phone !== phone || verification.restaurantId !== restaurantId) {
      throw new UnauthorizedError('Verification does not match phone or restaurant')
    }
    if (verification.isVerified()) {
      throw new BadRequestError('Verification already completed')
    }
    const timeSinceLastSent = Date.now() - verification.lastSentAt.getTime()
    if (timeSinceLastSent < RESEND_COOLDOWN_MS) {
      const waitSeconds = Math.ceil((RESEND_COOLDOWN_MS - timeSinceLastSent) / 1000)
      throw new BadRequestError(`Please wait ${waitSeconds} seconds before resending`)
    }
    // const code = this.generateCode() // To-Do: Uncomment this after testing
    const code = '123457'
    const codeHash = await this.hashCode(code)
    verification.markAsResent(codeHash)
    await this.verificationRepository.update({ id: verification.id }, verification)
    // To-Do: Uncomment this after testing
    // const sendResult = await this.whatsappClient.sendTemplateMessage({
    //   phone,
    //   template: VERIFICATION_TEMPLATE_NAME,
    //   language,
    //   components: [
    //     {
    //       type: 'body',
    //       parameters: [
    //         { type: 'text', text: code },
    //         { type: 'text', text: '10' }
    //       ]
    //     }
    //   ],
    //   correlationId
    // })
    // if (!sendResult.success) {
    //   this.logger.error('Failed to resend verification code via WhatsApp', {
    //     correlationId,
    //     verificationId: verification.id,
    //     phone: this.maskPhone(phone),
    //     resendCount: verification.metadata.resendCount,
    //     errorCode: sendResult.error?.code,
    //     errorMessage: sendResult.error?.message
    //   })
    //   throw new BadRequestError('Failed to resend verification code')
    // }
    this.logger.info('Verification code resent successfully', {
      correlationId,
      verificationId: verification.id,
      phone: this.maskPhone(phone),
      restaurantId,
      resendCount: verification.metadata.resendCount
    })
    return {
      verificationId: verification.id!,
      expiresInSeconds: Math.floor(VERIFICATION_TOKEN_TTL_MS / 1000)
    }
  }

  async verifyCode({ verificationId, code, customerId }: VerificationVerifyParams): Promise<VerificationVerifyResult> {
    const correlationId = this.generateCorrelationId()
    const verification = await this.verificationRepository.findById(verificationId)
    if (!verification) {
      throw new BadRequestError('Verification not found')
    }
    if (verification.isExpired()) {
      this.logger.warn('Verification code expired', {
        correlationId,
        verificationId,
        phone: this.maskPhone(verification.phone)
      })
      throw new BadRequestError('Verification code expired')
    }
    if (verification.isVerified()) {
      throw new BadRequestError('Verification already completed')
    }
    if (!verification.canAttempt()) {
      this.logger.warn('Verification attempts exceeded', {
        correlationId,
        verificationId,
        phone: this.maskPhone(verification.phone),
        attempts: verification.attempts,
        maxAttempts: verification.maxAttempts
      })
      throw new BadRequestError('Maximum verification attempts exceeded')
    }
    const isValid = await this.compareCode(code, verification.codeHash)
    if (!isValid) {
      verification.incrementAttempts()
      await this.verificationRepository.update({ id: verification.id }, verification)
      this.logger.warn('Invalid verification code attempt', {
        correlationId,
        verificationId,
        phone: this.maskPhone(verification.phone),
        attempts: verification.attempts,
        maxAttempts: verification.maxAttempts
      })
      throw new UnauthorizedError('Invalid verification code')
    }
    verification.verify()
    await this.verificationRepository.update({ id: verification.id }, verification)
    const token = this.generateToken()
    const tokenData: VerificationTokenData = {
      customerId,
      restaurantId: verification.restaurantId,
      phone: verification.phone,
      issuedAt: Date.now()
    }
    this.cache.set(`checkout-verification:${token}`, tokenData, VERIFICATION_TOKEN_TTL_MS)
    this.logger.info('Verification code verified successfully', {
      correlationId,
      verificationId,
      phone: this.maskPhone(verification.phone),
      restaurantId: verification.restaurantId
    })
    return {
      verificationToken: token,
      expiresInSeconds: Math.floor(VERIFICATION_TOKEN_TTL_MS / 1000)
    }
  }

  validateToken(token: string): VerificationTokenData | null {
    const tokenData = this.cache.get<VerificationTokenData>(`checkout-verification:${token}`)
    if (!tokenData) {
      return null
    }
    const age = Date.now() - tokenData.issuedAt
    if (age > VERIFICATION_TOKEN_TTL_MS) {
      this.cache.delete(`checkout-verification:${token}`)
      return null
    }
    return tokenData
  }

  async invalidate(verificationId: string): Promise<void> {
    const verification = await this.verificationRepository.findById(verificationId)
    if (!verification) {
      return
    }
    verification.expire()
    await this.verificationRepository.update({ id: verification.id }, verification)
    this.logger.info('Verification invalidated', {
      verificationId,
      phone: this.maskPhone(verification.phone)
    })
  }

  private async invalidatePendingVerifications(phone: string, restaurantId: string): Promise<void> {
    const pending = await this.verificationRepository.find({
      phone,
      restaurantId
    })
    for (const verification of pending) {
      if (verification.isPending()) {
        verification.expire()
        await this.verificationRepository.update({ id: verification.id }, verification)
      }
    }
  }

  // private generateCode(): string {
  //   const min = 100000
  //   const max = 999999
  //   return Math.floor(Math.random() * (max - min + 1) + min).toString()
  // }

  private async hashCode(code: string): Promise<string> {
    return hash(code, CODE_HASH_SALT_ROUNDS)
  }

  private async compareCode(code: string, hash: string): Promise<boolean> {
    return compare(code, hash)
  }

  private generateToken(): string {
    return randomBytes(32).toString('hex')
  }

  private generateCorrelationId(): string {
    return randomBytes(16).toString('hex')
  }

  private maskPhone(phone: string): string {
    if (phone.length <= 4) return '****'
    return `****${phone.slice(-4)}`
  }
}
