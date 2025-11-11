import { api } from '@/lib/api'
import type { OperationType, PaymentMethod } from '@/types/order'

export interface CreateOrderParams {
  clientId: string
  operationId?: string
  orderType: OperationType
  paymentMethod: PaymentMethod
  deliveryFee: number
  scheduledFor?: string
  verificationToken?: string
}

export interface CreateOrderResponse {
  id: string
  code: string
}

export const createOrder = async (data: CreateOrderParams): Promise<CreateOrderResponse> => {
  const response = await api.post<CreateOrderResponse>('/order', data)
  return response.data
}
