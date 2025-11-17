import { z } from 'zod'

import { PlanCode } from '@restaurants/domain/plans/enums/plan-code.enum'
import { BillingCycle } from '@restaurants/domain/subscriptions/enums/billing-cycle.enum'

export const updateSubscriptionSchema = z.object({
  planCode: z.nativeEnum(PlanCode),
  billingCycle: z.nativeEnum(BillingCycle),
  prorationBehavior: z.enum(['create_prorations', 'none', 'always_invoice']).optional()
})

export type UpdateSubscriptionInput = z.infer<typeof updateSubscriptionSchema>
