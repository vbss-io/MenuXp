import type { HttpClient } from '@/domain/http/http-client'
import { Registry } from '@/infra/dependency-injection/registry'

export interface DeleteCouponUsecaseInput {
  couponId: string
}

export interface DeleteCouponUsecaseOutput {
  success: boolean
}

export class DeleteCouponUsecase {
  private readonly httpClient: HttpClient

  constructor() {
    this.httpClient = Registry.getInstance().inject('authHttpClient') as HttpClient
  }

  async execute(params: DeleteCouponUsecaseInput): Promise<DeleteCouponUsecaseOutput> {
    const url = `${import.meta.env.VITE_BACKEND}/coupon/${params.couponId}`

    await this.httpClient.delete<void>({
      url
    })

    return {
      success: true
    }
  }
}
