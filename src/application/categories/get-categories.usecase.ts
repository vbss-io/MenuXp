import type { HttpClient } from '@/domain/http/http-client'
import { Registry } from '@/infra/dependency-injection/registry'
import type { Category } from '@/domain/models/category.model'

export interface GetCategoriesUsecaseInput {
  restaurantId: string
  mainCategoryId?: string
  searchMask?: string
  includeInactive?: boolean
  page?: number
  rowsPerPage?: number
  sortField?: 'name' | 'createdAt' | 'updatedAt'
  sortOrder?: 'asc' | 'desc'
}

interface GetCategoriesResponse {
  total: number
  categories: Category[]
}

export class GetCategoriesUsecase {
  protected url = `${import.meta.env.VITE_BACKEND}/categories`
  private readonly httpClient: HttpClient

  constructor() {
    this.httpClient = Registry.getInstance().inject('authHttpClient') as HttpClient
  }

  async execute(params: GetCategoriesUsecaseInput): Promise<Category[]> {
    const queryParams = new URLSearchParams()
    queryParams.append('restaurantId', params.restaurantId)
    if (params.mainCategoryId) queryParams.append('mainCategoryId', params.mainCategoryId)
    if (params.searchMask) queryParams.append('searchMask', params.searchMask)
    if (params.includeInactive !== undefined) queryParams.append('includeInactive', params.includeInactive.toString())
    if (params.page) queryParams.append('page', params.page.toString())
    if (params.rowsPerPage) queryParams.append('rowsPerPage', params.rowsPerPage.toString())
    if (params.sortField) queryParams.append('sortField', params.sortField)
    if (params.sortOrder) queryParams.append('sortOrder', params.sortOrder)
    const response = await this.httpClient.get<GetCategoriesResponse>({
      url: `${this.url}?${queryParams.toString()}`
    })
    return response.data.categories
  }
}
