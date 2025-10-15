import type { HttpClient } from '@/domain/http/http-client'
import type { Combo } from '@/domain/models/combo.model'
import { Registry } from '@/infra/dependency-injection/registry'

export interface GetCombosUsecaseInput {
  restaurantId: string
  categoryId?: string
  searchMask?: string
  includeInactive?: boolean
  page?: number
  rowsPerPage?: number
  sortField?: 'name' | 'createdAt' | 'updatedAt'
  sortOrder?: 'asc' | 'desc'
}

interface GetCombosResponse {
  total: number
  combos: Combo[]
}

export class GetCombosUsecase {
  protected url = `${import.meta.env.VITE_BACKEND}/combos`
  private readonly httpClient: HttpClient

  constructor() {
    this.httpClient = Registry.getInstance().inject('authHttpClient') as HttpClient
  }

  async execute(params: GetCombosUsecaseInput): Promise<GetCombosResponse> {
    const queryParams = new URLSearchParams()
    queryParams.append('restaurantId', params.restaurantId)
    if (params.categoryId) queryParams.append('categoryId', params.categoryId)
    if (params.searchMask) queryParams.append('searchMask', params.searchMask)
    if (params.includeInactive !== undefined) queryParams.append('includeInactive', params.includeInactive.toString())
    if (params.page) queryParams.append('page', params.page.toString())
    if (params.rowsPerPage) queryParams.append('rowsPerPage', params.rowsPerPage.toString())
    if (params.sortField) queryParams.append('sortField', params.sortField)
    if (params.sortOrder) queryParams.append('sortOrder', params.sortOrder)
    const response = await this.httpClient.get<GetCombosResponse>({
      url: `${this.url}?${queryParams.toString()}`
    })
    return response.data
  }
}
