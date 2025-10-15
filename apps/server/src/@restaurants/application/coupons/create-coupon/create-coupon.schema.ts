import { z } from 'zod'

import { ObjectIdSchema } from '@api/application/@schemas/object-id.schema'

export const CreateCouponSchema = z
  .object({
    code: z
      .string({
        required_error: 'code is required',
        invalid_type_error: 'code must be a string'
      })
      .min(3, 'code must be at least 3 characters')
      .max(20, 'code must be at most 20 characters')
      .regex(/^[A-Z0-9]+$/, 'code must contain only uppercase letters and numbers'),
    name: z
      .string({
        required_error: 'name is required',
        invalid_type_error: 'name must be a string'
      })
      .min(1, 'name is required')
      .max(100, 'name must be at most 100 characters'),
    restaurantId: ObjectIdSchema,
    type: z
      .enum(['percentage', 'fixed'], {
        required_error: 'type is required',
        invalid_type_error: 'type must be either percentage or fixed'
      })
      .transform((val) => val),
    value: z
      .number({
        required_error: 'value is required',
        invalid_type_error: 'value must be a number'
      })
      .min(0.01, 'value must be greater than 0'),
    maxUses: z
      .number({
        required_error: 'maxUses is required',
        invalid_type_error: 'maxUses must be a number'
      })
      .min(1, 'maxUses must be at least 1'),
    validFrom: z
      .string({
        required_error: 'validFrom is required',
        invalid_type_error: 'validFrom must be a string'
      })
      .datetime('validFrom must be a valid date'),
    validUntil: z
      .string({
        required_error: 'validUntil is required',
        invalid_type_error: 'validUntil must be a string'
      })
      .datetime('validUntil must be a valid date'),
    description: z
      .string({
        invalid_type_error: 'description must be a string'
      })
      .max(500, 'description must be at most 500 characters')
      .optional(),
    minOrderValue: z
      .number({
        invalid_type_error: 'minOrderValue must be a number'
      })
      .min(0, 'minOrderValue must be greater than or equal to 0')
      .optional(),
    maxDiscountValue: z
      .number({
        invalid_type_error: 'maxDiscountValue must be a number'
      })
      .min(0, 'maxDiscountValue must be greater than or equal to 0')
      .optional()
  })
  .refine(
    (data) => {
      const validFrom = new Date(data.validFrom)
      const validUntil = new Date(data.validUntil)
      return validFrom < validUntil
    },
    {
      message: 'validFrom must be before validUntil',
      path: ['validFrom']
    }
  )
  .refine(
    (data) => {
      if (data.type === 'percentage' && data.value > 100) {
        return false
      }
      return true
    },
    {
      message: 'percentage value cannot exceed 100%',
      path: ['value']
    }
  )

export type CreateCouponType = z.infer<typeof CreateCouponSchema>
