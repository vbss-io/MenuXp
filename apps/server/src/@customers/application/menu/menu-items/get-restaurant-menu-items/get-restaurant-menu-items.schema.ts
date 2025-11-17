import { z } from 'zod'

import { ObjectIdSchema } from '@api/application/@schemas/object-id.schema'

import { ItemTypeSchema } from '@customers/application/menu/@schemas/item-type.schema'

export const GetRestaurantMenuItemsSchema = z.object({
  restaurantId: ObjectIdSchema,
  type: ItemTypeSchema,
  menuItemIds: z.array(ObjectIdSchema).max(50, 'Maximum 50 menuItemIds allowed').optional()
})

export type GetRestaurantMenuItemsType = z.infer<typeof GetRestaurantMenuItemsSchema>
