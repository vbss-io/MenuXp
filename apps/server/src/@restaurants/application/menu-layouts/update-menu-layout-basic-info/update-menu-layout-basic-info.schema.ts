import { z } from 'zod'

import { ObjectIdSchema } from '@api/application/@schemas/object-id.schema'

export const UpdateMenuLayoutBasicInfoSchema = z.object({
  layoutId: ObjectIdSchema,
  name: z
    .string({
      invalid_type_error: 'name must be a string'
    })
    .min(1, 'name cannot be empty')
    .max(100, 'name cannot exceed 100 characters')
    .optional(),
  description: z
    .string({
      invalid_type_error: 'description must be a string'
    })
    .max(500, 'description cannot exceed 500 characters')
    .optional(),
  layout: z
    .string({
      invalid_type_error: 'layout must be a string'
    })
    .min(1, 'layout cannot be empty')
    .max(50, 'layout cannot exceed 50 characters')
    .optional()
})

export type UpdateMenuLayoutBasicInfoType = z.infer<typeof UpdateMenuLayoutBasicInfoSchema>
