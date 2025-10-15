import type { PlanFeatures } from '@/domain/models/plan.model'

export interface User {
  id: string
  name: string
  email: string
  role: string
  status: string
  avatar?: string
  restaurantId?: string
  subscription: {
    planId: string
    features: PlanFeatures
  }
}
