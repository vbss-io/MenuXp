import { z } from 'zod'

import { ObjectIdSchema } from '@api/application/@schemas/object-id.schema'
import { SlugSchema } from '@restaurants/application/restaurants/@schemas/slug.schema'

export const CheckSlugSchema = z.object({
  restaurantId: ObjectIdSchema.optional(),
  slug: SlugSchema
})

export type CheckSlugType = z.infer<typeof CheckSlugSchema>
