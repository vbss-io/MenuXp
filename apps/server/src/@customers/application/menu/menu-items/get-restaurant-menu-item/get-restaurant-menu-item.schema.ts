import { z } from 'zod'

import { ObjectIdSchema } from '@api/application/@schemas/object-id.schema'

export const GetRestaurantMenuItemSchema = z.object({
  restaurantId: ObjectIdSchema,
  menuItemId: ObjectIdSchema
})

export type GetRestaurantMenuItemType = z.infer<typeof GetRestaurantMenuItemSchema>
