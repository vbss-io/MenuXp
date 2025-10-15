import { z } from 'zod'

export const CreateRestaurantSchema = z.object({
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
      invalid_type_error: 'slug must be a string'
    })
    .regex(/^[a-z0-9-]+$/, 'slug must contain only lowercase letters, numbers and hyphens'),
  files: z
    .array(z.any())
    .max(1, {
      message: 'the files limit is 1'
    })
    .optional()
    .default([])
})

export type CreateRestaurantInputType = z.input<typeof CreateRestaurantSchema>
export type CreateRestaurantType = z.output<typeof CreateRestaurantSchema>
