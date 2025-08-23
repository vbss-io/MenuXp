import type { HttpClient } from '@/domain/http/http-client'
import { Registry } from '@/infra/dependency-injection/registry'

export interface GetRestaurantMenuItemsUsecaseInput {
  restaurantId: string
  menuItemIds?: string[]
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

export interface GetRestaurantMenuItemsUsecaseOutput {
  menuItems: RestaurantMenuItem[]
}

export class GetRestaurantMenuItemsUsecase {
  protected url = `${import.meta.env.VITE_BACKEND}/menu/restaurant/:restaurantId/items`
  private readonly httpClient: HttpClient

  constructor() {
    this.httpClient = Registry.getInstance().inject('httpClient') as HttpClient
  }

  async execute(params: GetRestaurantMenuItemsUsecaseInput): Promise<GetRestaurantMenuItemsUsecaseOutput> {
    const queryParams = new URLSearchParams()
    if (params.menuItemIds && params.menuItemIds.length > 0) {
      params.menuItemIds.forEach((id) => {
        queryParams.append('menuItemIds[]', id)
      })
    }
    const url = this.url.replace(':restaurantId', params.restaurantId)
    const fullUrl = queryParams.toString() ? `${url}?${queryParams.toString()}` : url
    const response = await this.httpClient.get<GetRestaurantMenuItemsUsecaseOutput>({
      url: fullUrl
    })
    return response.data
  }
}
