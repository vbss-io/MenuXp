import type { OperationStatus } from '@/domain/enums/operation/operation-status.enum'

export interface Operation {
  id: string
  restaurantId: string
  status: OperationStatus
  createdAt: Date
  updatedAt: Date
}

export interface OperationKPI {
  dailyOrders: number
  averagePreparationTime: number
  cancellations: number
  dailyRevenue: number
  sentForDelivery: number
  delivered: number
}

export interface CreateOperationRequest {
  restaurantId: string
}

export interface OperationResponse {
  id: string
}
