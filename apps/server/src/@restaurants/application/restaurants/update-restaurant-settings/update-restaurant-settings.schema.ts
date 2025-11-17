import { z } from 'zod'

import { ObjectIdSchema } from '@api/application/@schemas/object-id.schema'

import { BusinessWeekDay } from '@restaurants/domain/restaurants/enums/business-week-day.enum'
import { OperationType } from '@restaurants/domain/restaurants/enums/operation-type.enum'
import { PaymentMethod } from '@restaurants/domain/restaurants/enums/payment-methods.enum'
import { Templates } from '@restaurants/domain/restaurants/enums/templates.enum'

export const UpdateRestaurantSettingsSchema = z.object({
  restaurantId: ObjectIdSchema,
  operationTypes: z.array(z.nativeEnum(OperationType)).optional(),
  paymentMethods: z.array(z.nativeEnum(PaymentMethod)).optional(),
  deliveryFee: z.number().optional(),
  businessHours: z.record(z.nativeEnum(BusinessWeekDay), z.string()).optional(),
  templates: z.record(z.nativeEnum(Templates), z.string()).optional(),
  acceptsScheduling: z.boolean().optional()
})

export type UpdateRestaurantSettingsType = z.infer<typeof UpdateRestaurantSettingsSchema>
