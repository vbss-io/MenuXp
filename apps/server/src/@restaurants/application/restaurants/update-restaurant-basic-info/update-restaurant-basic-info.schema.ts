import { z } from 'zod'

import { ObjectIdSchema } from '@api/application/@schemas/object-id.schema'

export const UpdateRestaurantBasicInfoSchema = z.object({
  restaurantId: ObjectIdSchema,
  name: z
    .string({
      required_error: 'name is required',
      invalid_type_error: 'name must be a string'
    })
    .min(1, 'name cannot be empty'),
  description: z
    .string({
      required_error: 'description is required',
      invalid_type_error: 'description must be a string'
    })
    .min(1, 'description cannot be empty'),
  slug: z
    .string({
      required_error: 'slug is required',
      invalid_type_error: 'slug must be a string'
    })
    .min(1, 'slug cannot be empty')
    .regex(/^[a-z0-9-]+$/, 'slug must contain only lowercase letters, numbers and hyphens'),
  primaryColor: z
    .string({
      invalid_type_error: 'primaryColor must be a string'
    })
    .regex(/^#[0-9A-Fa-f]{6}$/, 'primaryColor must be a valid hex color')
    .optional(),
  secondaryColor: z
    .string({
      invalid_type_error: 'secondaryColor must be a string'
    })
    .regex(/^#[0-9A-Fa-f]{6}$/, 'secondaryColor must be a valid hex color')
    .optional(),
  files: z
    .array(z.any())
    .max(1, {
      message: 'the files limit is 1'
    })
    .optional()
    .default([])
})

export type UpdateRestaurantBasicInfoInputType = z.input<typeof UpdateRestaurantBasicInfoSchema>
export type UpdateRestaurantBasicInfoType = z.output<typeof UpdateRestaurantBasicInfoSchema>
