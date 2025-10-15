import type { HttpClient } from '@/domain/http/http-client'
import type { Coupon } from '@/domain/models/coupon.model'
import { Registry } from '@/infra/dependency-injection/registry'

export interface GetRestaurantCouponsUsecaseInput {
  restaurantId: string
  includeInactive?: boolean
}

export interface GetRestaurantCouponsUsecaseOutput {
  coupons: Coupon[]
}

export class GetRestaurantCouponsUsecase {
  private readonly httpClient: HttpClient

  constructor() {
    this.httpClient = Registry.getInstance().inject('authHttpClient') as HttpClient
  }

  async execute(params: GetRestaurantCouponsUsecaseInput): Promise<GetRestaurantCouponsUsecaseOutput> {
    const queryParams = new URLSearchParams()
    queryParams.append('restaurantId', params.restaurantId)
    if (params.includeInactive !== undefined) {
      queryParams.append('includeInactive', params.includeInactive.toString())
    }
    const url = `${import.meta.env.VITE_BACKEND}/coupons?${queryParams.toString()}`
    const response = await this.httpClient.get<{ coupons: Coupon[] }>({
      url
    })
    return {
      coupons: response.data.coupons.map((coupon) => ({
        ...coupon,
        validFrom: new Date(coupon.validFrom),
        validUntil: new Date(coupon.validUntil),
        createdAt: new Date(coupon.createdAt),
        updatedAt: new Date(coupon.updatedAt)
      }))
    }
  }
}
