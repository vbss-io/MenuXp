import { z } from 'zod'

import { ObjectIdSchema } from '@api/application/@schemas/object-id.schema'
import { CategoryOptionalSchema } from '@restaurants/application/categories/@schemas/category-optional.schema'

export const UpdateCategorySchema = z.object({
  categoryId: ObjectIdSchema,
  name: z
    .string({
      required_error: 'name is required',
      invalid_type_error: 'name must be a string'
    })
    .min(1, 'name cannot be empty'),
  description: z.string().optional(),
  mainCategoryId: ObjectIdSchema.optional(),
  icon: z.string().optional(),
  optionals: CategoryOptionalSchema
})

export type UpdateCategoryInputType = z.input<typeof UpdateCategorySchema>
export type UpdateCategoryType = z.output<typeof UpdateCategorySchema>
