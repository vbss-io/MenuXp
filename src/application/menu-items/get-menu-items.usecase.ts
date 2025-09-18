import type { HttpClient } from '@/domain/http/http-client'
import type { MenuItem } from '@/domain/models/menu-item.model'
import { Registry } from '@/infra/dependency-injection/registry'

export interface GetMenuItemsUsecaseInput {
  restaurantId: string
  categoryId?: string
  searchMask?: string
  includeInactive?: boolean
  page?: number
  rowsPerPage?: number
  sortField?: 'name' | 'createdAt' | 'updatedAt' | 'price'
  sortOrder?: 'asc' | 'desc'
}

interface GetMenuItemsResponse {
  total: number
  menuItems: MenuItem[]
}

export class GetMenuItemsUsecase {
  protected url = `${import.meta.env.VITE_BACKEND}/menu-items`
  private readonly httpClient: HttpClient

  constructor() {
    this.httpClient = Registry.getInstance().inject('authHttpClient') as HttpClient
  }

  async execute(params: GetMenuItemsUsecaseInput): Promise<GetMenuItemsResponse> {
    const queryParams = new URLSearchParams()
    queryParams.append('restaurantId', params.restaurantId)
    if (params.categoryId) queryParams.append('categoryId', params.categoryId)
    if (params.searchMask) queryParams.append('searchMask', params.searchMask)
    if (params.includeInactive !== undefined) queryParams.append('includeInactive', params.includeInactive.toString())
    if (params.page !== undefined) queryParams.append('page', params.page.toString())
    if (params.rowsPerPage !== undefined) queryParams.append('rowsPerPage', params.rowsPerPage.toString())
    if (params.sortField !== undefined) queryParams.append('sortField', params.sortField)
    if (params.sortOrder !== undefined) queryParams.append('sortOrder', params.sortOrder)
    const response = await this.httpClient.get<GetMenuItemsResponse>({
      url: `${this.url}?${queryParams.toString()}`
    })
    return response.data
  }
}
