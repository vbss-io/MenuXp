import type { NextFunction, Request, Response } from 'express'

import { ONE_DAY } from '@api/domain/consts/timeouts.const'
import { ForbiddenError, UnauthorizedError } from '@api/domain/errors'
import { TokenAuthentication } from '@api/infra/adapters/auth/token-auth.adapter'
import { Cache } from '@api/infra/adapters/cache/cache.adapter'
import { CustomRequest } from '@api/infra/adapters/http/http-server.adapter'
import { inject } from '@api/infra/dependency-injection/registry'
import { RequestFacade } from '@api/infra/facades/request.facade'
import { UserAuth } from '@api/infra/facades/user-auth.dto'
import { SubscriptionPaymentGateway } from '@api/infra/gateways/subscription-payment.gateway'

import { UserRole } from '@restaurants/domain/users/enums/user-role.enum'

export interface AuthHandler {
  handle: (req: Request, res: Response, next: NextFunction) => Promise<void>
  handleAdmin: (req: Request, res: Response, next: NextFunction) => Promise<void>
  handleStripe: (req: Request, res: Response, next: NextFunction) => Promise<void>
}

export class ExpressAuthHandler implements AuthHandler {
  @inject('SubscriptionPaymentGateway')
  private readonly SubscriptionPaymentGateway!: SubscriptionPaymentGateway

  @inject('TokenAuthentication')
  private readonly TokenAuthentication!: TokenAuthentication

  @inject('RequestFacade')
  private readonly RequestFacade!: RequestFacade

  @inject('Cache')
  private readonly Cache!: Cache

  async handle(req: Request, _res: Response, next: NextFunction): Promise<void> {
    const { authorization } = req.headers
    const token = authorization?.replace('Bearer ', '')
    if (!token) throw new UnauthorizedError('Missing Authorization Token')
    try {
      const user = this.TokenAuthentication.decode<UserAuth>(token)
      const cacheKey = `auth:${user.id}`
      this.Cache.set(cacheKey, { token }, ONE_DAY)
      this.RequestFacade.setUser(user)
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error'
      throw new UnauthorizedError(errorMessage)
    }
    next()
  }

  async handleAdmin(_req: Request, _res: Response, next: NextFunction): Promise<void> {
    const user = this.RequestFacade.getUser()
    if (user.role !== UserRole.SUPER_ADMIN) throw new ForbiddenError('User Not Allowed')
    next()
  }

  async handleStripe(req: CustomRequest, _res: Response, next: NextFunction): Promise<void> {
    const signature = req.headers['stripe-signature']
    if (!signature) throw new UnauthorizedError('Missing Stripe Signature')
    if (Array.isArray(signature)) throw new UnauthorizedError('Invalid Stripe Signature Format')
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET ?? ''
    if (!webhookSecret) throw new UnauthorizedError('Missing Stripe Webhook Secret Configuration')
    try {
      const rawBody = Buffer.isBuffer(req.body) ? req.body : Buffer.from(JSON.stringify(req.body))
      const event = this.SubscriptionPaymentGateway.constructWebhookEvent(rawBody, signature, webhookSecret)
      req.stripeEvent = event
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Webhook signature validation failed'
      throw new UnauthorizedError(errorMessage)
    }
    next()
  }
}
