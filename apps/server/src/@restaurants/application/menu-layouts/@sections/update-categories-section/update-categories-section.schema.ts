import { z } from 'zod'

import { ObjectIdSchema } from '@api/application/@schemas/object-id.schema'

export const UpdateCategoriesSectionSchema = z.object({
  layoutId: ObjectIdSchema,
  sectionId: z
    .string({
      required_error: 'sectionId is required',
      invalid_type_error: 'sectionId must be a string'
    })
    .uuid('sectionId must be a valid UUID'),
  categoryIds: z
    .array(ObjectIdSchema)
    .nullable()
    .refine((val) => val === null || val === undefined || (Array.isArray(val) && val.length > 0), {
      message: 'categoryIds must be null or a non-empty array'
    })
})

export type UpdateCategoriesSectionType = z.infer<typeof UpdateCategoriesSectionSchema>
