import { z } from 'zod'

import { ObjectIdSchema } from '@api/application/@schemas/object-id.schema'

export const UpdateCouponSchema = z
  .object({
    couponId: ObjectIdSchema,
    name: z
      .string({
        invalid_type_error: 'name must be a string'
      })
      .min(1, 'name is required')
      .max(100, 'name must be at most 100 characters')
      .optional(),
    description: z
      .string({
        invalid_type_error: 'description must be a string'
      })
      .max(500, 'description must be at most 500 characters')
      .optional(),
    type: z
      .enum(['percentage', 'fixed'], {
        invalid_type_error: 'type must be either percentage or fixed'
      })
      .transform((val) => val)
      .optional(),
    value: z
      .number({
        invalid_type_error: 'value must be a number'
      })
      .min(0.01, 'value must be greater than 0')
      .optional(),
    maxUses: z
      .number({
        invalid_type_error: 'maxUses must be a number'
      })
      .min(1, 'maxUses must be at least 1')
      .optional(),
    validFrom: z
      .string({
        invalid_type_error: 'validFrom must be a string'
      })
      .datetime('validFrom must be a valid date')
      .optional(),
    validUntil: z
      .string({
        invalid_type_error: 'validUntil must be a string'
      })
      .datetime('validUntil must be a valid date')
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
      .optional(),
    status: z
      .enum(['active', 'inactive'], {
        invalid_type_error: 'status must be either active or inactive'
      })
      .transform((val) => val)
      .optional()
  })
  .refine(
    (data) => {
      if (data.validFrom && data.validUntil) {
        const validFrom = new Date(data.validFrom)
        const validUntil = new Date(data.validUntil)
        return validFrom < validUntil
      }
      return true
    },
    {
      message: 'validFrom must be before validUntil',
      path: ['validFrom']
    }
  )
  .refine(
    (data) => {
      if (data.type === 'percentage' && data.value && data.value > 100) {
        return false
      }
      return true
    },
    {
      message: 'percentage value cannot exceed 100%',
      path: ['value']
    }
  )

export type UpdateCouponType = z.infer<typeof UpdateCouponSchema>
