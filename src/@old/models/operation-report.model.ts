import type { Order } from '@/@old/models/order.model'

export interface OperationReport {
  id: string
  date: string
  startTime: string
  endTime: string
  duration: string
  totalOrders: number
  completedOrders: number
  canceledOrders: number
  revenue: number
  orders: Order[]
}
