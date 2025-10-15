import { z } from 'zod'

import { ObjectIdSchema } from '@api/application/@schemas/object-id.schema'

export const UpdateBannerSectionSchema = z.object({
  layoutId: ObjectIdSchema,
  sectionId: z
    .string({
      required_error: 'sectionId is required',
      invalid_type_error: 'sectionId must be a string'
    })
    .uuid('sectionId must be a valid UUID'),
  tag: z
    .string({
      invalid_type_error: 'tag must be a string'
    })
    .max(50, 'tag cannot exceed 50 characters')
    .optional(),
  title: z
    .string({
      invalid_type_error: 'title must be a string'
    })
    .max(100, 'title cannot exceed 100 characters')
    .optional(),
  subtitle: z
    .string({
      invalid_type_error: 'subtitle must be a string'
    })
    .max(200, 'subtitle cannot exceed 200 characters')
    .optional(),
  files: z.any().optional()
})

export type UpdateBannerSectionInputType = z.input<typeof UpdateBannerSectionSchema>
export type UpdateBannerSectionType = z.output<typeof UpdateBannerSectionSchema>
