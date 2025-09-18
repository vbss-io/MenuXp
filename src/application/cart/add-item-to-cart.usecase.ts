import type { HttpClient } from '@/domain/http/http-client'
import type { CartItemOptional } from '@/domain/models/cart.model'
import { Registry } from '@/infra/dependency-injection/registry'

export interface AddItemToCartUsecaseInput {
  clientId: string
  restaurantId: string
  menuItemId: string
  quantity: number
  type: 'menu-item' | 'combo'
  optionals?: CartItemOptional[]
}

export interface AddItemToCartUsecaseOutput {
  success: boolean
  message?: string
}

export class AddItemToCartUsecase {
  protected url = `${import.meta.env.VITE_BACKEND}/cart/add-item`
  private readonly httpClient: HttpClient

  constructor() {
    this.httpClient = Registry.getInstance().inject('httpClient') as HttpClient
  }

  async execute(params: AddItemToCartUsecaseInput): Promise<AddItemToCartUsecaseOutput> {
    const response = await this.httpClient.post<AddItemToCartUsecaseOutput>({
      url: this.url,
      body: params
    })
    return response.data
  }
}
