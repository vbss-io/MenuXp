import { z } from 'zod'

import { ObjectIdSchema } from '@api/application/@schemas/object-id.schema'

export const ReorderSectionsSchema = z.object({
  layoutId: ObjectIdSchema,
  newOrder: z
    .array(
      z
        .string({
          invalid_type_error: 'sectionId must be a string'
        })
        .uuid('sectionId must be a valid UUID')
    )
    .min(1, 'newOrder must contain at least one section ID')
})

export type ReorderSectionsType = z.infer<typeof ReorderSectionsSchema>
