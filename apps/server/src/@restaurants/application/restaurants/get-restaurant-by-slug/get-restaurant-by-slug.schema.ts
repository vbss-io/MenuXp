import { z } from 'zod'

import { SlugSchema } from '@restaurants/application/restaurants/@schemas/slug.schema'

export const GetRestaurantBySlugSchema = z.object({
  slug: SlugSchema
})

export type GetRestaurantBySlugType = z.infer<typeof GetRestaurantBySlugSchema>
