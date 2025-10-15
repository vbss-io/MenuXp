import { z } from 'zod'

import { ObjectIdSchema } from '@api/application/@schemas/object-id.schema'

export const GetOperationStatisticsSchema = z.object({
  operationId: ObjectIdSchema,
  restaurantId: ObjectIdSchema
})

export type GetOperationStatisticsType = z.infer<typeof GetOperationStatisticsSchema>
