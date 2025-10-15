import { z } from 'zod'

import { ObjectIdSchema } from '@api/application/@schemas/object-id.schema'

export const CategoriesSectionSchema = z.object({
  categoryIds: z.array(ObjectIdSchema).nullable()
})

export type CategoriesSectionType = z.infer<typeof CategoriesSectionSchema>
