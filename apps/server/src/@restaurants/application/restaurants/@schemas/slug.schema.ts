import { z } from 'zod'

export const SlugSchema = z
  .string({
    required_error: 'slug is required',
    invalid_type_error: 'slug must be a string'
  })
  .min(1, 'slug cannot be empty')
  .regex(/^[a-z0-9-]+$/, 'slug must contain only lowercase letters, numbers and hyphens')
