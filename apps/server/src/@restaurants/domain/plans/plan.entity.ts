import { PlanCode } from '@restaurants/domain/plans/enums/plan-code.enum'

export interface PlanFeatures {
  menuItems: number | null
  monthlyOrders: number | null
  staffMembers: number
  customDomain: boolean
  removePoweredBy: boolean
  onlinePayment: boolean
  hasCoupons: boolean
  activeCoupons: number | null
  hasCampaigns: boolean
  hasAdvancedAnalytics: boolean
  menuLayouts: number
  maxStorage: number | null
}

export interface PlanIntervals {
  month: number
  year: number
}

export class Plan {
  name: string
  code: PlanCode
  price: number
  yearlyDiscount: number
  currency: string
  isActive: boolean
  features: PlanFeatures
  description?: string
  monthlyPriceId?: string
  yearlyPriceId?: string
  externalProductId?: string
  intervals?: PlanIntervals
  taxBehavior?: string
  trialDays?: number

  private constructor(
    readonly id: string | undefined,
    name: string,
    code: PlanCode,
    price: number,
    yearlyDiscount: number,
    currency: string,
    isActive: boolean,
    features: PlanFeatures,
    description?: string,
    monthlyPriceId?: string,
    yearlyPriceId?: string,
    externalProductId?: string,
    intervals?: PlanIntervals,
    taxBehavior?: string,
    trialDays?: number,
    readonly createdAt?: Date,
    readonly updatedAt?: Date
  ) {
    this.name = name
    this.code = code
    this.price = price
    this.yearlyDiscount = yearlyDiscount
    this.currency = currency
    this.isActive = isActive
    this.features = features
    this.description = description
    this.monthlyPriceId = monthlyPriceId
    this.yearlyPriceId = yearlyPriceId
    this.externalProductId = externalProductId
    this.intervals = intervals
    this.taxBehavior = taxBehavior
    this.trialDays = trialDays
  }

  static create(input: CreatePlan): Plan {
    return new Plan(
      undefined,
      input.name,
      input.code,
      input.price,
      input.yearlyDiscount,
      input.currency,
      true,
      input.features,
      input.description
    )
  }

  static restore(input: RestorePlan): Plan {
    return new Plan(
      input.id,
      input.name,
      input.code,
      input.price,
      input.yearlyDiscount,
      input.currency,
      input.isActive,
      input.features,
      input.description,
      input.monthlyPriceId,
      input.yearlyPriceId,
      input.externalProductId,
      input.intervals,
      input.taxBehavior,
      input.trialDays,
      input.createdAt,
      input.updatedAt
    )
  }

  update(input: Partial<Plan>): void {
    this.name = input.name ?? this.name
    this.code = input.code ?? this.code
    this.price = input.price ?? this.price
    this.yearlyDiscount = input.yearlyDiscount ?? this.yearlyDiscount
    this.currency = input.currency ?? this.currency
    this.features = input.features ?? this.features
    this.description = input.description ?? this.description
    this.monthlyPriceId = input.monthlyPriceId ?? this.monthlyPriceId
    this.yearlyPriceId = input.yearlyPriceId ?? this.yearlyPriceId
    this.externalProductId = input.externalProductId ?? this.externalProductId
    this.intervals = input.intervals ?? this.intervals
    this.taxBehavior = input.taxBehavior ?? this.taxBehavior
    this.trialDays = input.trialDays ?? this.trialDays
  }

  activate(): void {
    this.isActive = true
  }

  deactivate(): void {
    this.isActive = false
  }

  isFree(): boolean {
    return this.code === PlanCode.FREE
  }

  getMonthlyPrice(): number {
    return this.price
  }

  getYearlyPrice(): number {
    return this.price * (1 - this.yearlyDiscount) * 12
  }
}

export interface CreatePlan {
  name: string
  code: PlanCode
  price: number
  yearlyDiscount: number
  currency: string
  features: PlanFeatures
  description?: string
}

type RestorePlan = CreatePlan & {
  id: string
  isActive: boolean
  monthlyPriceId?: string
  yearlyPriceId?: string
  externalProductId?: string
  intervals?: PlanIntervals
  taxBehavior?: string
  trialDays?: number
  createdAt: Date
  updatedAt: Date
}
