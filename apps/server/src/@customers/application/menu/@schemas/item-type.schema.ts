import { z } from 'zod'

export const ItemTypeSchema = z.enum(['best_sellers', 'discounts', 'custom'], {
  required_error: 'section type is required',
  invalid_type_error: 'section type must be one of: best_sellers, discounts, custom'
})
