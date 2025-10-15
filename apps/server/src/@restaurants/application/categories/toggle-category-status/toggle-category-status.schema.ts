import { z } from 'zod'

import { ObjectIdSchema } from '@api/application/@schemas/object-id.schema'

export const ToggleCategoryStatusSchema = z.object({
  categoryId: ObjectIdSchema
})

export type ToggleCategoryStatusType = z.infer<typeof ToggleCategoryStatusSchema>
