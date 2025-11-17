import { z } from 'zod'

import { ObjectIdSchema } from '@api/application/@schemas/object-id.schema'

import { ItemTypeSchema } from '@customers/application/menu/@schemas/item-type.schema'

export const GetRestaurantCombosSchema = z.object({
  restaurantId: ObjectIdSchema,
  type: ItemTypeSchema,
  comboIds: z.array(ObjectIdSchema).max(50, 'Maximum 50 comboIds allowed').optional()
})

export type GetRestaurantCombosType = z.infer<typeof GetRestaurantCombosSchema>
