import { z } from 'zod'

import { PlanCode } from '@restaurants/domain/plans/enums/plan-code.enum'
import { BillingCycle } from '@restaurants/domain/subscriptions/enums/billing-cycle.enum'

export const createCheckoutSessionSchema = z.object({
  planCode: z.nativeEnum(PlanCode),
  billingCycle: z.nativeEnum(BillingCycle)
})

export type CreateCheckoutSessionInput = z.infer<typeof createCheckoutSessionSchema>
