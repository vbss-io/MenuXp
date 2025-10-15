import { z } from 'zod'

import { ObjectIdSchema } from '@api/application/@schemas/object-id.schema'

const SocialMediaSchema = z.object({
  instagram: z.string().optional(),
  facebook: z.string().optional(),
  whatsapp: z.string().optional()
})

export const UpdateRestaurantContactInfoSchema = z.object({
  restaurantId: ObjectIdSchema,
  phone: z.string({
    required_error: 'phone is required',
    invalid_type_error: 'phone must be a string'
  }),
  email: z
    .string({
      required_error: 'email is required'
    })
    .email({
      message: 'email must be a valid email'
    }),
  website: z.string().optional(),
  socialMedia: SocialMediaSchema.optional()
})

export type UpdateRestaurantContactInfoType = z.infer<typeof UpdateRestaurantContactInfoSchema>
