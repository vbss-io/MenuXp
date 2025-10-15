import { z } from 'zod'

import { SlugSchema } from '@restaurants/application/restaurants/@schemas/slug.schema'

export const GetOrderBySlugAndCodeSchema = z.object({
  restaurantSlug: SlugSchema,
  orderCode: z
    .string({
      required_error: 'orderCode is required',
      invalid_type_error: 'orderCode must be a string'
    })
    .min(1, 'orderCode cannot be empty')
    .length(10, 'orderCode must be exactly 10 characters')
})

export type GetOrderBySlugAndCodeType = z.infer<typeof GetOrderBySlugAndCodeSchema>
