import { z } from 'zod'

import { ObjectIdSchema } from '@api/application/@schemas/object-id.schema'

export const DeleteCategorySchema = z.object({
  categoryId: ObjectIdSchema
})

export type DeleteCategoryType = z.infer<typeof DeleteCategorySchema>
