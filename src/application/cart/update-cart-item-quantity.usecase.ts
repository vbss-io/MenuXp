import type { HttpClient } from '@/domain/http/http-client'
import type { CartItemOptional } from '@/domain/models/cart.model'
import { Registry } from '@/infra/dependency-injection/registry'

export interface UpdateCartItemQuantityUsecaseInput {
  clientId: string
  restaurantId: string
  menuItemId: string
  quantity: number
  optionals?: CartItemOptional[]
}

export interface UpdateCartItemQuantityUsecaseOutput {
  success: boolean
  message?: string
}

export class UpdateCartItemQuantityUsecase {
  protected url = `${import.meta.env.VITE_BACKEND}/cart/update-quantity`
  private readonly httpClient: HttpClient

  constructor() {
    this.httpClient = Registry.getInstance().inject('httpClient') as HttpClient
  }

  async execute(params: UpdateCartItemQuantityUsecaseInput): Promise<UpdateCartItemQuantityUsecaseOutput> {
    const response = await this.httpClient.put<UpdateCartItemQuantityUsecaseOutput>({
      url: this.url,
      body: params
    })
    return response.data
  }
}
