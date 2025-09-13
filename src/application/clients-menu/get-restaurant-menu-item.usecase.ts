import type { HttpClient } from '@/domain/http/http-client'
import { Registry } from '@/infra/dependency-injection/registry'

export interface GetRestaurantMenuItemUsecaseInput {
  restaurantId: string
  menuItemId: string
}

export interface RestaurantMenuItem {
  id: string
  name: string
  description?: string
  categoryId: string
  categoryName: string
  price: number
  stock: number
  discount: number
  medias: string[]
  optionals: Array<{
    name: string
    maxQuantity?: number
    price: number
  }>
}

export interface GetRestaurantMenuItemUsecaseOutput {
  menuItem: RestaurantMenuItem
}

export class GetRestaurantMenuItemUsecase {
  protected url = `${import.meta.env.VITE_BACKEND}/menu/restaurant/:restaurantId/item/:menuItemId`
  private readonly httpClient: HttpClient

  constructor() {
    this.httpClient = Registry.getInstance().inject('httpClient') as HttpClient
  }

  async execute(params: GetRestaurantMenuItemUsecaseInput): Promise<GetRestaurantMenuItemUsecaseOutput> {
    const url = this.url.replace(':restaurantId', params.restaurantId).replace(':menuItemId', params.menuItemId)
    const response = await this.httpClient.get<GetRestaurantMenuItemUsecaseOutput>({
      url
    })
    return response.data
  }
}
