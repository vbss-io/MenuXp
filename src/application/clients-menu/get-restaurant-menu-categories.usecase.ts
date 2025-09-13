import type { HttpClient } from '@/domain/http/http-client'
import { Registry } from '@/infra/dependency-injection/registry'

export interface GetRestaurantMenuCategoriesUsecaseInput {
  restaurantId: string
  categoryIds?: string[]
}

export interface RestaurantMenuCategory {
  id: string
  name: string
  description?: string
  icon?: string
}

export interface GetRestaurantMenuCategoriesUsecaseOutput {
  categories: RestaurantMenuCategory[]
}

export class GetRestaurantMenuCategoriesUsecase {
  protected url = `${import.meta.env.VITE_BACKEND}/menu/restaurant/:restaurantId/categories`
  private readonly httpClient: HttpClient

  constructor() {
    this.httpClient = Registry.getInstance().inject('httpClient') as HttpClient
  }

  async execute(params: GetRestaurantMenuCategoriesUsecaseInput): Promise<GetRestaurantMenuCategoriesUsecaseOutput> {
    const url = this.url.replace(':restaurantId', params.restaurantId)
    const body = params.categoryIds && params.categoryIds.length > 0 ? { categoryIds: params.categoryIds } : {}
    const response = await this.httpClient.post<GetRestaurantMenuCategoriesUsecaseOutput>({
      url,
      body
    })
    return response.data
  }
}
