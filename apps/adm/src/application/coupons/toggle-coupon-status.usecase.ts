import type { HttpClient } from '@/domain/http/http-client'
import { Registry } from '@/infra/dependency-injection/registry'

export interface ToggleCouponStatusUsecaseInput {
  couponId: string
}

export interface ToggleCouponStatusUsecaseOutput {
  success: boolean
}

export class ToggleCouponStatusUsecase {
  private readonly httpClient: HttpClient

  constructor() {
    this.httpClient = Registry.getInstance().inject('authHttpClient') as HttpClient
  }

  async execute(params: ToggleCouponStatusUsecaseInput): Promise<ToggleCouponStatusUsecaseOutput> {
    const url = `${import.meta.env.VITE_BACKEND}/coupon/${params.couponId}/toggle-status`
    await this.httpClient.patch<void>({
      url
    })
    return {
      success: true
    }
  }
}
