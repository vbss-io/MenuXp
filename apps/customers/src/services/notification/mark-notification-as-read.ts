import { api } from '@/lib/api'

export interface MarkNotificationAsReadParams {
  customerId: string
  notificationId: string
}

export const markNotificationAsRead = async ({
  customerId,
  notificationId
}: MarkNotificationAsReadParams): Promise<void> => {
  await api.patch(`/customer/notification/${notificationId}/read`, {
    customerId
  })
}
