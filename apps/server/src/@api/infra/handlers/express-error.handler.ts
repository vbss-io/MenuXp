import type { NextFunction, Request, Response } from 'express'
import { ZodError } from 'zod'

import { HttpCode } from '@api/domain/enums/http.enum'
import { BaseError, ValidationError } from '@api/domain/errors'
import { Logger } from '@api/infra/adapters/logger/logger.adapter'
import { inject } from '@api/infra/dependency-injection/registry'

interface ErrorResponse {
  message: string
  details?: Array<Record<string, string>> | Record<string, string[]>
}

export interface ErrorHandler {
  handle: (err: Error, req: Request, res: Response, next: NextFunction) => Response
}

export class ExpressErrorHandler implements ErrorHandler {
  @inject('Logger')
  private readonly Logger!: Logger

  handle(err: Error, _req: Request, res: Response, _next: NextFunction): Response {
    this.Logger.error(err.message)
    console.error(err)
    if (err instanceof ZodError) {
      const errorResponse: ErrorResponse = {
        message: 'Validation error',
        details: err.issues.map((issue) => ({
          field: issue.path.join('.') || 'root',
          message: issue.message
        }))
      }
      return res.status(HttpCode.BAD_REQUEST).json(errorResponse)
    }
    if (err instanceof BaseError) {
      const errorResponse: ErrorResponse = {
        message: err.message
      }
      if (err instanceof ValidationError && err.details) {
        errorResponse.details = err.details
      }
      return res.status(err.statusCode).json(errorResponse)
    }
    return res.status(HttpCode.INTERNAL_SERVER_ERROR).json(err.message ?? 'Internal Server Error')
  }
}
