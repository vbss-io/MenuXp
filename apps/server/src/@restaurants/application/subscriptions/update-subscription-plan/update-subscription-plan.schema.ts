import { z } from 'zod'

import { PlanCode } from '@restaurants/domain/plans/enums/plan-code.enum'

export const updateSubscriptionPlanSchema = z.object({
  planCode: z.nativeEnum(PlanCode)
})

export type UpdateSubscriptionPlanInput = z.infer<typeof updateSubscriptionPlanSchema>
