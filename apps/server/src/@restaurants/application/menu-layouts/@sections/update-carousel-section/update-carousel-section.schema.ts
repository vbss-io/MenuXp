import { z } from 'zod'

import { ObjectIdSchema } from '@api/application/@schemas/object-id.schema'

export const UpdateCarouselSectionSchema = z.object({
  layoutId: ObjectIdSchema,
  sectionId: z
    .string({
      required_error: 'sectionId is required',
      invalid_type_error: 'sectionId must be a string'
    })
    .uuid('sectionId must be a valid UUID'),

  removeMedias: z
    .string({
      invalid_type_error: 'removeMedias must be a JSON string'
    })
    .optional()
    .transform((val) => {
      if (!val) return []
      try {
        const parsed = JSON.parse(val) as string[]
        return Array.isArray(parsed) ? parsed : []
      } catch {
        return []
      }
    })
    .pipe(z.array(z.string().url()).optional().default([])),
  files: z.array(z.any()).optional().default([])
})

export type UpdateCarouselSectionInputType = z.input<typeof UpdateCarouselSectionSchema>
export type UpdateCarouselSectionType = z.output<typeof UpdateCarouselSectionSchema>
