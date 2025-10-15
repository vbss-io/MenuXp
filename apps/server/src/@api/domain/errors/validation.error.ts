import { BaseError } from './base.error'

export class ValidationError extends BaseError {
  public readonly details?: Record<string, string[]>

  constructor(message: string = 'Validation Error', details?: Record<string, string[]>) {
    super(message, 422)
    this.details = details
  }
}
