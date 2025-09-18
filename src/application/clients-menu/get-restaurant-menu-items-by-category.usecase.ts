import type { HttpClient } from '@/domain/http/http-client'
import { Registry } from '@/infra/dependency-injection/registry'

export interface GetRestaurantMenuItemsByCategoryUsecaseInput {
  restaurantId: string
  categoryId: string
}

export interface RestaurantMenuItem {
  id: string
  name: string
  description?: string
  categoryId: string
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

export interface GetRestaurantMenuItemsByCategoryUsecaseOutput {
  menuItems: RestaurantMenuItem[]
}

export class GetRestaurantMenuItemsByCategoryUsecase {
  protected url = `${import.meta.env.VITE_BACKEND}/menu/restaurant/:restaurantId/category/:categoryId/items`
  private readonly httpClient: HttpClient

  constructor() {
    this.httpClient = Registry.getInstance().inject('httpClient') as HttpClient
  }

  async execute(
    params: GetRestaurantMenuItemsByCategoryUsecaseInput
  ): Promise<GetRestaurantMenuItemsByCategoryUsecaseOutput> {
    const url = this.url.replace(':restaurantId', params.restaurantId).replace(':categoryId', params.categoryId)

    const response = await this.httpClient.get<GetRestaurantMenuItemsByCategoryUsecaseOutput>({
      url
    })
    return response.data
  }
}
