import type { CouponType } from '@/domain/enums/coupons/coupon-type.enum'
import type { HttpClient } from '@/domain/http/http-client'
import type { Coupon } from '@/domain/models/coupon.model'
import { Registry } from '@/infra/dependency-injection/registry'

export interface CreateCouponUsecaseInput {
  code: string
  name: string
  restaurantId: string
  type: CouponType
  value: number
  maxUses: number
  validFrom: Date
  validUntil: Date
  description?: string
  minOrderValue?: number
  maxDiscountValue?: number
}

export interface CreateCouponUsecaseOutput {
  coupon: Coupon
}

export class CreateCouponUsecase {
  private readonly httpClient: HttpClient

  constructor() {
    this.httpClient = Registry.getInstance().inject('authHttpClient') as HttpClient
  }

  async execute(params: CreateCouponUsecaseInput): Promise<CreateCouponUsecaseOutput> {
    const url = `${import.meta.env.VITE_BACKEND}/coupon`

    const response = await this.httpClient.post<{ coupon: Coupon }>({
      url,
      body: {
        code: params.code,
        name: params.name,
        restaurantId: params.restaurantId,
        type: params.type,
        value: params.value,
        maxUses: params.maxUses,
        validFrom: params.validFrom.toISOString(),
        validUntil: params.validUntil.toISOString(),
        description: params.description,
        minOrderValue: params.minOrderValue,
        maxDiscountValue: params.maxDiscountValue
      }
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
