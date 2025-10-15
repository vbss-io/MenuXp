import { api } from '@/lib/api'
import type { Notification } from '@/types/notification'

export interface GetCustomerNotificationsParams {
  customerId: string
  limit?: number
  offset?: number
  unreadOnly?: boolean
}

export interface GetCustomerNotificationsResponse {
  notifications: Notification[]
  total: number
  unreadCount: number
}

export const getCustomerNotifications = async ({
  customerId,
  limit = 20,
  offset = 0,
  unreadOnly = false
}: GetCustomerNotificationsParams): Promise<GetCustomerNotificationsResponse> => {
  const params = new URLSearchParams()
  params.append('limit', limit.toString())
  params.append('offset', offset.toString())
  params.append('unreadOnly', unreadOnly.toString())
  const response = await api.get<GetCustomerNotificationsResponse>(
    `/customer/${customerId}/notifications?${params.toString()}`
  )
  return response.data
}
