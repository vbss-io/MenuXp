import { z } from 'zod'

import { ObjectIdSchema } from '@api/application/@schemas/object-id.schema'
import { ComboItemSchema } from '@restaurants/application/combos/@schemas/combo-item.schema'

export const UpdateComboSchema = z.object({
  comboId: ObjectIdSchema,
  restaurantId: ObjectIdSchema,
  categoryId: ObjectIdSchema.optional(),
  name: z
    .string({
      invalid_type_error: 'name must be a string'
    })
    .min(1, 'name cannot be empty')
    .optional(),
  description: z.string().optional(),
  price: z
    .string()
    .optional()
    .transform((val) => (val ? Number(val) : undefined))
    .refine((val) => val === undefined || val >= 0, {
      message: 'price must be greater than or equal to 0'
    }),
  stock: z
    .string()
    .optional()
    .transform((val) => (val ? Number(val) : undefined))
    .refine((val) => val === undefined || val >= 0, {
      message: 'stock must be greater than or equal to 0'
    }),
  discount: z
    .string()
    .optional()
    .transform((val) => (val ? Number(val) : undefined))
    .refine((val) => val === undefined || (val >= 0 && val <= 100), {
      message: 'discount must be between 0 and 100'
    }),
  files: z
    .array(z.any())
    .max(5, {
      message: 'the files limit is 5'
    })
    .optional()
    .default([]),
  items: z
    .string({
      invalid_type_error: 'items must be a JSON string'
    })
    .transform((val) => {
      if (!val) return []
      try {
        return JSON.parse(val) as Array<{
          menuItemId: string
          quantity: number
          name: string
          price: number
        }>
      } catch {
        return []
      }
    })
    .refine((val) => Array.isArray(val), {
      message: 'items must be an array'
    })
    .refine((val) => val.length > 0, {
      message: 'items cannot be empty'
    })
    .refine(
      (val) =>
        val.every((item) => {
          try {
            ComboItemSchema.parse(item)
            return true
          } catch {
            return false
          }
        }),
      {
        message: 'items must contain valid combo item objects'
      }
    )
    .optional(),
  optionals: z
    .string({
      invalid_type_error: 'optionals must be a JSON string'
    })
    .optional()
    .transform((val) => {
      if (!val) return []
      try {
        return JSON.parse(val) as Array<{ name: string; maxQuantity?: number; price: number }>
      } catch {
        return []
      }
    })
    .refine((val) => Array.isArray(val), {
      message: 'optionals must be an array'
    })
    .refine(
      (val) =>
        val.every(
          (item) =>
            typeof item === 'object' &&
            item !== null &&
            typeof item.name === 'string' &&
            item.name.length > 0 &&
            (item.maxQuantity === undefined || (typeof item.maxQuantity === 'number' && item.maxQuantity >= 0)) &&
            typeof item.price === 'number' &&
            item.price >= 0
        ),
      {
        message: 'optionals must contain valid objects with name, optional maxQuantity, and price'
      }
    ),
  useCategoryOptionals: z
    .string()
    .optional()
    .transform((val) => val === 'true')
})

export type UpdateComboInputType = z.input<typeof UpdateComboSchema>
export type UpdateComboType = z.infer<typeof UpdateComboSchema>
