import { PlanCode } from '@restaurants/domain/plans/enums/plan-code.enum'
import { z } from 'zod'

export const updateSubscriptionPlanSchema = z.object({
  planCode: z.nativeEnum(PlanCode)
})

export type UpdateSubscriptionPlanInput = z.infer<typeof updateSubscriptionPlanSchema>
