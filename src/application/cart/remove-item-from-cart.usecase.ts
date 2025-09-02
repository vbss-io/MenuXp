import type { HttpClient } from '@/domain/http/http-client'
import type { CartItemOptional } from '@/domain/models/cart.model'
import { Registry } from '@/infra/dependency-injection/registry'

export interface RemoveItemFromCartUsecaseInput {
  clientId: string
  restaurantId: string
  menuItemId: string
  optionals?: CartItemOptional[]
}

export interface RemoveItemFromCartUsecaseOutput {
  success: boolean
  message?: string
}

export class RemoveItemFromCartUsecase {
  protected url = `${import.meta.env.VITE_BACKEND}/cart/remove-item`
  private readonly httpClient: HttpClient

  constructor() {
    this.httpClient = Registry.getInstance().inject('httpClient') as HttpClient
  }

  async execute(params: RemoveItemFromCartUsecaseInput): Promise<RemoveItemFromCartUsecaseOutput> {
    const response = await this.httpClient.delete<RemoveItemFromCartUsecaseOutput>({
      url: this.url,
      body: params
    })
    return response.data
  }
}
