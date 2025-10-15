import { z } from 'zod'

import { ObjectIdSchema } from '@api/application/@schemas/object-id.schema'

export const RevokeSectionSchema = z.object({
  userId: ObjectIdSchema
})

export type RevokeSectionType = z.infer<typeof RevokeSectionSchema>
