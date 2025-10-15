import type { NextFunction, Request, Response } from 'express'

import { ONE_DAY } from '@api/domain/consts/timeouts.const'
import { ForbiddenError, UnauthorizedError } from '@api/domain/errors'
import { TokenAuthentication } from '@api/infra/adapters/auth/token-auth.adapter'
import { Cache } from '@api/infra/adapters/cache/cache.adapter'
import { CustomRequest } from '@api/infra/adapters/http/http-server.adapter'
import { inject } from '@api/infra/dependency-injection/registry'
import { RequestFacade } from '@api/infra/facades/request.facade'
import { UserAuth } from '@api/infra/facades/user-auth.dto'
import { UserRole } from '@restaurants/domain/users/enums/user-role.enum'
// import { StripeHttpGateway } from '@/infra/gateways/stripe.gateway'

export interface AuthHandler {
  handle: (req: Request, res: Response, next: NextFunction) => Promise<void>
  handleAdmin: (req: Request, res: Response, next: NextFunction) => Promise<void>
  handleStripe: (req: Request, res: Response, next: NextFunction) => Promise<void>
}

export class ExpressAuthHandler implements AuthHandler {
  // @inject('stripeGateway')
  // private readonly stripeGateway!: StripeHttpGateway

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
    // const event = this.stripeGateway.authenticate(req.body, req.headers['stripe-signature'] as string)
    // req.stripeEvent = event
    next()
  }
}
