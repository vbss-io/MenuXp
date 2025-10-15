import { z } from 'zod'

import { ObjectIdSchema } from '@api/application/@schemas/object-id.schema'

export const GetRestaurantItemsByCategorySchema = z.object({
  restaurantId: ObjectIdSchema,
  categoryId: ObjectIdSchema
})

export type GetRestaurantItemsByCategoryType = z.infer<typeof GetRestaurantItemsByCategorySchema>
