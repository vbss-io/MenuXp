import type { HttpClient } from '@/domain/http/http-client'
import { Registry } from '@/infra/dependency-injection/registry'

export interface GetCategoriesNamesUsecaseInput {
  restaurantId: string
  searchMask?: string
  removeSubCategories?: boolean
}

interface CategoryName {
  id: string
  name: string
  mainCategoryName?: string
}

export class GetCategoriesNamesUsecase {
  protected url = `${import.meta.env.VITE_BACKEND}/categories/names`
  private readonly httpClient: HttpClient

  constructor() {
    this.httpClient = Registry.getInstance().inject('authHttpClient') as HttpClient
  }

  async execute(params: GetCategoriesNamesUsecaseInput): Promise<CategoryName[]> {
    const queryParams = new URLSearchParams()
    queryParams.append('restaurantId', params.restaurantId)
    if (params.searchMask) queryParams.append('searchMask', params.searchMask)
    const response = await this.httpClient.get<CategoryName[]>({
      url: `${this.url}?${queryParams.toString()}`
    })
    const categoriesNames = response.data
    if (params.removeSubCategories) {
      return categoriesNames.filter((category) => !category.mainCategoryName)
    }
    return categoriesNames
  }
}
