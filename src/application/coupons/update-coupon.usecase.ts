import type { CouponType } from '@/domain/enums/coupons/coupon-type.enum'
import type { HttpClient } from '@/domain/http/http-client'
import type { Coupon } from '@/domain/models/coupon.model'
import { Registry } from '@/infra/dependency-injection/registry'

export interface UpdateCouponUsecaseInput {
  couponId: string
  name?: string
  type?: CouponType
  value?: number
  maxUses?: number
  validFrom?: Date
  validUntil?: Date
  description?: string
  minOrderValue?: number
  maxDiscountValue?: number
}

export interface UpdateCouponUsecaseOutput {
  coupon: Coupon
}

export class UpdateCouponUsecase {
  private readonly httpClient: HttpClient

  constructor() {
    this.httpClient = Registry.getInstance().inject('authHttpClient') as HttpClient
  }

  async execute(params: UpdateCouponUsecaseInput): Promise<UpdateCouponUsecaseOutput> {
    const url = `${import.meta.env.VITE_BACKEND}/coupon/${params.couponId}`

    const body: Record<string, any> = {}
    if (params.name !== undefined) body.name = params.name
    if (params.type !== undefined) body.type = params.type
    if (params.value !== undefined) body.value = params.value
    if (params.maxUses !== undefined) body.maxUses = params.maxUses
    if (params.validFrom !== undefined) body.validFrom = params.validFrom.toISOString()
    if (params.validUntil !== undefined) body.validUntil = params.validUntil.toISOString()
    if (params.description !== undefined) body.description = params.description
    if (params.minOrderValue !== undefined) body.minOrderValue = params.minOrderValue
    if (params.maxDiscountValue !== undefined) body.maxDiscountValue = params.maxDiscountValue

    const response = await this.httpClient.put<{ coupon: Coupon }>({
      url,
      body
    })

    return {
      coupon: {
        ...response.data.coupon,
        validFrom: new Date(response.data.coupon.validFrom),
        validUntil: new Date(response.data.coupon.validUntil),
        createdAt: new Date(response.data.coupon.createdAt),
        updatedAt: new Date(response.data.coupon.updatedAt)
      }
    }
  }
}
