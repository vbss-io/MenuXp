import { z } from 'zod'

import { ObjectIdSchema } from '@api/application/@schemas/object-id.schema'

export const GetRestaurantByIdSchema = z.object({
  restaurantId: ObjectIdSchema
})

export type GetRestaurantByIdType = z.infer<typeof GetRestaurantByIdSchema>
