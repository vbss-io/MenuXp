import { z } from 'zod'

import { ObjectIdSchema } from '@api/application/@schemas/object-id.schema'

import { OrderStatus } from '@restaurants/domain/orders/enums/order-status.enum'
import { OperationType } from '@restaurants/domain/restaurants/enums/operation-type.enum'
import { PaymentMethod } from '@restaurants/domain/restaurants/enums/payment-methods.enum'

export const GetOrdersSchema = z.object({
  restaurantId: ObjectIdSchema,
  operationId: ObjectIdSchema.optional(),
  status: z.nativeEnum(OrderStatus).optional(),
  orderType: z.nativeEnum(OperationType).optional(),
  paymentMethod: z.nativeEnum(PaymentMethod).optional(),
  page: z.number().min(1).optional().default(1),
  rowsPerPage: z.number().min(1).max(100).optional().default(20),
  sortField: z.enum(['name', 'createdAt', 'updatedAt']).optional().default('name'),
  sortOrder: z.enum(['asc', 'desc']).optional().default('asc')
})

export type GetOrdersType = z.infer<typeof GetOrdersSchema>
