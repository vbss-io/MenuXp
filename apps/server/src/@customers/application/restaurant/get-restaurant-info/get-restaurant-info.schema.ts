import { z } from 'zod'

export const GetRestaurantInfoSchema = z.object({
  slug: z
    .string({
      required_error: 'slug is required',
      invalid_type_error: 'slug must be a string'
    })
    .min(1, 'slug cannot be empty')
})

export type GetRestaurantInfoType = z.infer<typeof GetRestaurantInfoSchema>
