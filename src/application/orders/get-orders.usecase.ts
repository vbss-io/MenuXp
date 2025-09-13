import type { HttpClient } from '@/domain/http/http-client'
import type { Order, OrderStatus, OperationType, PaymentMethod } from '@/domain/models/order.model'
import { Registry } from '@/infra/dependency-injection/registry'

export interface GetOrdersUsecaseInput {
  restaurantId: string
  operationId?: string
  status?: OrderStatus
  orderType?: OperationType
  paymentMethod?: PaymentMethod
  sortField?: 'createdAt' | 'updatedAt' | 'total' | 'status'
  sortOrder?: 'asc' | 'desc'
  page?: number
  rowsPerPage?: number
}

interface GetOrdersResponse {
  total: number
  orders: Order[]
}

export class GetOrdersUsecase {
  protected url = `${import.meta.env.VITE_BACKEND}/orders`
  private readonly httpClient: HttpClient

  constructor() {
    this.httpClient = Registry.getInstance().inject('authHttpClient') as HttpClient
  }

  async execute(params: GetOrdersUsecaseInput): Promise<GetOrdersResponse> {
    const queryParams = new URLSearchParams()
    queryParams.append('restaurantId', params.restaurantId)
    if (params.operationId) queryParams.append('operationId', params.operationId)
    if (params.status) queryParams.append('status', params.status)
    if (params.orderType) queryParams.append('orderType', params.orderType)
    if (params.paymentMethod) queryParams.append('paymentMethod', params.paymentMethod)
    if (params.sortField) queryParams.append('sortField', params.sortField)
    if (params.sortOrder) queryParams.append('sortOrder', params.sortOrder)
    if (params.page) queryParams.append('page', params.page.toString())
    if (params.rowsPerPage) queryParams.append('rowsPerPage', params.rowsPerPage.toString())
    const response = await this.httpClient.get<GetOrdersResponse>({
      url: `${this.url}?${queryParams.toString()}`
    })
    return response.data
  }
}
