import { z } from 'zod'

import { ObjectIdSchema } from '@api/application/@schemas/object-id.schema'

export const GetCombosSchema = z.object({
  restaurantId: ObjectIdSchema,
  categoryId: ObjectIdSchema.optional(),
  searchMask: z.string().optional(),
  includeInactive: z.string().optional().default('false'),
  page: z.number().min(1).optional().default(1),
  rowsPerPage: z.number().min(1).max(100).optional().default(20),
  sortField: z.enum(['name', 'createdAt', 'updatedAt']).optional().default('name'),
  sortOrder: z.enum(['asc', 'desc']).optional().default('asc')
})

export type GetCombosType = z.infer<typeof GetCombosSchema>
