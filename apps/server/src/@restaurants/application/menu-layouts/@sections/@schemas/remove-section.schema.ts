import { z } from 'zod'

import { ObjectIdSchema } from '@api/application/@schemas/object-id.schema'

export const RemoveSectionSchema = z.object({
  layoutId: ObjectIdSchema,
  sectionId: z
    .string({
      required_error: 'sectionId is required',
      invalid_type_error: 'sectionId must be a string'
    })
    .uuid('sectionId must be a valid UUID')
})

export type RemoveSectionType = z.infer<typeof RemoveSectionSchema>
