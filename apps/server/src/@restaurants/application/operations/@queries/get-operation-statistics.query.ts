import { inject } from '@api/infra/dependency-injection/registry'
import type { OperationStatistics } from '@restaurants/application/operations/get-operation-statistics/get-operation-statistics.usecase'
import { OrderStatus } from '@restaurants/domain/orders/enums/order-status.enum'
import { Order } from '@restaurants/domain/orders/orders.entity'
import { OrderRepository } from '@restaurants/infra/repositories/orders.repository'

export interface GetOperationStatisticsQueryInput {
  restaurantId: string
  operationId: string
}

export type GetOperationStatisticsQueryOutput = OperationStatistics

export class GetOperationStatisticsQuery {
  @inject('OrderRepository')
  private readonly OrderRepository!: OrderRepository

  async execute({
    restaurantId,
    operationId
  }: GetOperationStatisticsQueryInput): Promise<GetOperationStatisticsQueryOutput> {
    const orders = await this.OrderRepository.find({
      restaurantId,
      operationId
    })
    const dailyOrders = orders.length
    const cancellations = orders.filter((order) => order.status === OrderStatus.CANCELLED).length
    const sentForDelivery = orders.filter((order) => order.status === OrderStatus.SENT_FOR_DELIVERY).length
    const delivered = orders.filter((order) => order.status === OrderStatus.DELIVERED).length
    const dailyRevenue = orders
      .filter((order) => order.status !== OrderStatus.CANCELLED)
      .reduce((sum, order) => sum + order.total, 0)
    const averagePreparationTime = this.calculateAveragePreparationTime(orders)
    const ordersByStatus = this.calculateOrdersByStatus(orders)
    return {
      dailyOrders,
      averagePreparationTime,
      cancellations,
      dailyRevenue,
      sentForDelivery,
      delivered,
      ordersByStatus
    }
  }

  private calculateAveragePreparationTime(orders: Order[]): number {
    const completedOrders = orders.filter(
      (order) =>
        order.status === OrderStatus.DELIVERED ||
        order.status === OrderStatus.READY ||
        order.status === OrderStatus.SENT_FOR_DELIVERY
    )
    if (completedOrders.length === 0) {
      return 0
    }
    const totalPreparationTime = completedOrders.reduce((total, order) => {
      if (!order.createdAt || !order.updatedAt) {
        return total
      }
      const createdAt = new Date(order.createdAt)
      const updatedAt = new Date(order.updatedAt)
      const preparationTimeMs = updatedAt.getTime() - createdAt.getTime()
      const preparationTimeMinutes = preparationTimeMs / (1000 * 60)

      return total + preparationTimeMinutes
    }, 0)
    const averageTime = totalPreparationTime / completedOrders.length
    return Math.round(averageTime * 10) / 10
  }

  private calculateOrdersByStatus(orders: Order[]): { status: OrderStatus; count: number; color: string }[] {
    const statusCounts = new Map<OrderStatus, number>()
    Object.values(OrderStatus).forEach((status) => {
      statusCounts.set(status, 0)
    })
    orders.forEach((order) => {
      const currentCount = statusCounts.get(order.status) || 0
      statusCounts.set(order.status, currentCount + 1)
    })
    const colorMap: Record<OrderStatus, string> = {
      [OrderStatus.SCHEDULED]: '#6366f1',
      [OrderStatus.RECEIVED]: '#3b82f6',
      [OrderStatus.CONFIRMED]: '#8b5cf6',
      [OrderStatus.IN_PRODUCTION]: '#f59e0b',
      [OrderStatus.READY]: '#22c55e',
      [OrderStatus.SENT_FOR_DELIVERY]: '#10b981',
      [OrderStatus.DELIVERED]: '#059669',
      [OrderStatus.CANCELLED]: '#ef4444'
    }
    return Array.from(statusCounts.entries())
      .map(([status, count]) => ({
        status,
        count,
        color: colorMap[status]
      }))
      .filter((item) => item.count > 0)
  }
}
