import { z } from 'zod'

import { ObjectIdSchema } from '@api/application/@schemas/object-id.schema'
import { OrderStatus } from '@restaurants/domain/orders/enums/order-status.enum'

export const UpdateOrderSchema = z
  .object({
    orderId: ObjectIdSchema,
    status: z.nativeEnum(OrderStatus),
    cancelReason: z
      .string({
        invalid_type_error: 'cancelReason must be a string'
      })
      .min(1, 'cancelReason cannot be empty')
      .max(500, 'cancelReason cannot exceed 500 characters')
      .optional()
  })
  .refine(
    (data) => {
      if (data.status === OrderStatus.CANCELLED && !data.cancelReason) {
        return false
      }
      return true
    },
    {
      message: 'cancelReason is required when status is CANCELLED',
      path: ['cancelReason']
    }
  )

export type UpdateOrderType = z.infer<typeof UpdateOrderSchema>
