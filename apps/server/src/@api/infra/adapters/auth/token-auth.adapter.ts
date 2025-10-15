import jwt from 'jsonwebtoken'

import { JWT_EXPIRATION_TIME } from '@api/domain/consts/timeouts.const'
import { UnauthorizedError } from '@api/domain/errors'
import { Cache } from '@api/infra/adapters/cache/cache.adapter'
import { inject } from '@api/infra/dependency-injection/registry'

export interface TokenAuthentication {
  encode: (input: object, secret?: string) => string
  decode: <T>(input: string, secret?: string) => T
  isTokenRevoked: (token: string) => boolean
}

export class JWTAdapter implements TokenAuthentication {
  @inject('Cache')
  private readonly Cache!: Cache

  encode(input: object, secret?: string): string {
    const jwtSecret = (secret ?? process.env.JWT_SECRET) as string
    return jwt.sign(input, jwtSecret, { expiresIn: JWT_EXPIRATION_TIME })
  }

  decode<T>(input: string, secret?: string): T {
    const jwtSecret = (secret ?? process.env.JWT_SECRET) as string
    const decoded = jwt.verify(input, jwtSecret) as T
    if (this.isTokenRevoked(input)) {
      throw new UnauthorizedError('Token Revoked')
    }
    return decoded
  }

  isTokenRevoked(token: string): boolean {
    const revokedTokens = this.Cache.get<string[]>('revoked_tokens') || []
    return revokedTokens.includes(token)
  }
}
