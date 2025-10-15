import { z } from 'zod'

import { ObjectIdSchema } from '@api/application/@schemas/object-id.schema'

export const UpdateMenuItemsSectionSchema = z.object({
  layoutId: ObjectIdSchema,
  sectionId: z
    .string({
      required_error: 'sectionId is required',
      invalid_type_error: 'sectionId must be a string'
    })
    .uuid('sectionId must be a valid UUID'),
  type: z
    .enum(['custom', 'best_sellers', 'discounts'], {
      errorMap: () => ({ message: 'Type must be custom, best_sellers, or discounts' })
    })
    .optional(),
  title: z
    .string({
      invalid_type_error: 'title must be a string'
    })
    .max(100, 'Title must be at most 100 characters')
    .optional(),
  menuItemIds: z
    .array(ObjectIdSchema)
    .nullable()
    .optional()
    .refine((val) => val === null || val === undefined || (Array.isArray(val) && val.length > 0), {
      message: 'menuItemIds must be null or a non-empty array'
    })
})

export type UpdateMenuItemsSectionType = z.infer<typeof UpdateMenuItemsSectionSchema>
