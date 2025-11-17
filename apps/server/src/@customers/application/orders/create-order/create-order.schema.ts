import { z } from 'zod'

import { ObjectIdSchema } from '@api/application/@schemas/object-id.schema'

import { OperationType } from '@restaurants/domain/restaurants/enums/operation-type.enum'
import { PaymentMethod } from '@restaurants/domain/restaurants/enums/payment-methods.enum'

export const CreateOrderSchema = z
  .object({
    clientId: ObjectIdSchema,
    operationId: ObjectIdSchema.optional(),
    orderType: z.nativeEnum(OperationType),
    paymentMethod: z.nativeEnum(PaymentMethod),
    deliveryFee: z.number().min(0).default(0),
    scheduledFor: z.coerce.date().optional(),
    verificationToken: z.string().min(1)
  })
  .refine(
    (data) => {
      if (!data.scheduledFor && !data.operationId) {
        return false
      }
      return true
    },
    {
      message: 'operationId is required when scheduledFor is not provided',
      path: ['operationId']
    }
  )
  .refine(
    (data) => {
      if (data.scheduledFor && data.scheduledFor <= new Date()) {
        return false
      }
      return true
    },
    {
      message: 'scheduledFor must be a future date',
      path: ['scheduledFor']
    }
  )

export type CreateOrderType = z.infer<typeof CreateOrderSchema>
