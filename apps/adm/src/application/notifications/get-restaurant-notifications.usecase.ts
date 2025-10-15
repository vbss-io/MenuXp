import type { HttpClient } from '@/domain/http/http-client'
import type { Notification } from '@/domain/models/notification.model'
import { Registry } from '@/infra/dependency-injection/registry'

export interface GetRestaurantNotificationsUsecaseInput {
  restaurantId: string
  limit?: number
  offset?: number
  unreadOnly?: boolean
}

export interface GetRestaurantNotificationsUsecaseOutput {
  notifications: Notification[]
  total: number
  unreadCount: number
}

export class GetRestaurantNotificationsUsecase {
  protected url = `${import.meta.env.VITE_BACKEND}/restaurant/:restaurantId/notifications`
  private readonly httpClient: HttpClient

  constructor() {
    this.httpClient = Registry.getInstance().inject('authHttpClient') as HttpClient
  }

  async execute(params: GetRestaurantNotificationsUsecaseInput): Promise<GetRestaurantNotificationsUsecaseOutput> {
    const queryParams = new URLSearchParams()
    if (params.limit !== undefined) queryParams.append('limit', params.limit.toString())
    if (params.offset !== undefined) queryParams.append('offset', params.offset.toString())
    if (params.unreadOnly !== undefined) queryParams.append('unreadOnly', params.unreadOnly.toString())
    const url = this.url.replace(':restaurantId', params.restaurantId)
    const fullUrl = queryParams.toString() ? `${url}?${queryParams.toString()}` : url
    const response = await this.httpClient.get<GetRestaurantNotificationsUsecaseOutput>({
      url: fullUrl
    })
    return response.data
  }
}
