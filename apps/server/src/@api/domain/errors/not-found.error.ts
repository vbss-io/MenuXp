import { BaseError } from './base.error'

export class NotFoundError extends BaseError {
  constructor(resource: string, identifier?: string | number) {
    const message = identifier ? `${resource} with identifier '${identifier}' not found` : `${resource} not found`
    super(message, 404)
  }
}
