import { ForbiddenError, NotFoundError } from '@api/domain/errors'
import { Queue } from '@api/infra/adapters/queue/queue.adapter'
import { inject } from '@api/infra/dependency-injection/registry'
import { UpdateOrderType } from '@restaurants/application/orders/update-order/update-order.schema'
import { OperationStatus } from '@restaurants/domain/operations/enums/operation-status.enum'
import { Operation } from '@restaurants/domain/operations/operation.entity'
import { ORDER_STATUS_CHANGED } from '@restaurants/domain/orders/consts/order-events.const'
import { OrderStatus } from '@restaurants/domain/orders/enums/order-status.enum'
import { OrderStatusChanged } from '@restaurants/domain/orders/events/order-status-changed.event'
import { OperationRepository } from '@restaurants/infra/repositories/operation.repository'
import { OrderRepository } from '@restaurants/infra/repositories/orders.repository'
import { RestaurantRepository } from '@restaurants/infra/repositories/restaurant.repository'
import { UserRepository } from '@restaurants/infra/repositories/user.repository'

type UpdateOrderUsecaseInput = UpdateOrderType & {
  userId: string
}

export class UpdateOrderUsecase {
  @inject('Queue')
  private readonly Queue!: Queue

  @inject('UserRepository')
  private readonly UserRepository!: UserRepository

  @inject('RestaurantRepository')
  private readonly RestaurantRepository!: RestaurantRepository

  @inject('OrderRepository')
  private readonly OrderRepository!: OrderRepository

  @inject('OperationRepository')
  private readonly OperationRepository!: OperationRepository

  async execute({ userId, orderId, status, cancelReason }: UpdateOrderUsecaseInput): Promise<void> {
    const user = await this.UserRepository.findById(userId)
    if (!user) throw new NotFoundError('User', userId)
    const order = await this.OrderRepository.findById(orderId)
    if (!order) throw new NotFoundError('Order', orderId)
    const restaurant = await this.RestaurantRepository.findById(order.restaurantId)
    if (!restaurant) throw new NotFoundError('Restaurant', order.restaurantId)
    if (!restaurant.hasPermission(userId)) throw new ForbiddenError('User does not have permission to update order')
    const oldStatus = order.status
    if (order.status === OrderStatus.SCHEDULED && status !== OrderStatus.SCHEDULED) {
      const activeOperation = await this.findActiveOperation(order.restaurantId)
      if (!activeOperation) {
        throw new NotFoundError('Operation')
      }
      order.assignToOperation(activeOperation.id as string)
    }
    order.update({ status, cancelReason })
    await this.OrderRepository.update({ id: orderId }, order)
    if (oldStatus !== status) {
      const orderStatusChangedEvent = new OrderStatusChanged({
        orderId,
        orderCode: order.code,
        restaurantId: order.restaurantId,
        customerId: order.clientId,
        customerName: order.customer.name,
        oldStatus,
        newStatus: status,
        cancelReason
      })
      await this.Queue.publish(ORDER_STATUS_CHANGED.eventName, orderStatusChangedEvent.data)
    }
  }

  private async findActiveOperation(restaurantId: string): Promise<Operation | null> {
    const operations = await this.OperationRepository.find({
      restaurantId,
      status: OperationStatus.RUNNING
    })
    return operations.sort((a, b) => {
      const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0
      const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0
      return dateB - dateA
    })[0]
  }
}
