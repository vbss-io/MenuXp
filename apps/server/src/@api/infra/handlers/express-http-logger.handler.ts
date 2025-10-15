import { NextFunction, Request, Response } from 'express'

import { Logger } from '@api/infra/adapters/logger/logger.adapter'
import { inject } from '@api/infra/dependency-injection/registry'

export interface HttpLoggerHandler {
  handle: (req: Request, res: Response, next: NextFunction) => void
}

export class ExpressHttpLoggerHandler implements HttpLoggerHandler {
  @inject('Logger')
  private readonly Logger!: Logger

  handle(req: Request, res: Response, next: NextFunction): void {
    const start = Date.now()
    res.on('finish', () => {
      const duration = Date.now() - start
      const message = `${req.method} ${req.ip} ${req.get('user-agent')} ${req.originalUrl} ${res.statusCode} ${duration}ms`
      this.Logger.http(message)
    })
    next()
  }
}
