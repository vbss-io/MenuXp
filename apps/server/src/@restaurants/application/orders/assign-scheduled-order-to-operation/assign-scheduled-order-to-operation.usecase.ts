import { ForbiddenError } from '@api/domain/errors/forbidden.error'
import { NotFoundError } from '@api/domain/errors/not-found.error'
import { inject } from '@api/infra/dependency-injection/registry'
import { OperationStatus } from '@restaurants/domain/operations/enums/operation-status.enum'
import { OrderStatus } from '@restaurants/domain/orders/enums/order-status.enum'
import { OperationRepository } from '@restaurants/infra/repositories/operation.repository'
import { OrderRepository } from '@restaurants/infra/repositories/orders.repository'
import { RestaurantRepository } from '@restaurants/infra/repositories/restaurant.repository'
import { UserRepository } from '@restaurants/infra/repositories/user.repository'

export interface AssignScheduledOrderToOperationUsecaseInput {
  orderId: string
  operationId: string
  userId: string
}

export class AssignScheduledOrderToOperationUsecase {
  @inject('UserRepository')
  private readonly UserRepository!: UserRepository

  @inject('RestaurantRepository')
  private readonly RestaurantRepository!: RestaurantRepository

  @inject('OperationRepository')
  private readonly OperationRepository!: OperationRepository

  @inject('OrderRepository')
  private readonly OrderRepository!: OrderRepository

  async execute({ orderId, operationId, userId }: AssignScheduledOrderToOperationUsecaseInput): Promise<void> {
    const user = await this.UserRepository.findById(userId)
    if (!user) throw new NotFoundError('User', userId)
    const order = await this.OrderRepository.findById(orderId)
    if (!order) throw new NotFoundError('Order', orderId)
    if (order.status !== OrderStatus.SCHEDULED) {
      throw new Error('Order is not scheduled')
    }
    const restaurant = await this.RestaurantRepository.findById(order.restaurantId)
    if (!restaurant) throw new NotFoundError('Restaurant', order.restaurantId)
    if (!restaurant.hasPermission(userId))
      throw new ForbiddenError('User does not have permission to assign order to operation')
    const operation = await this.OperationRepository.findById(operationId)
    if (!operation) throw new NotFoundError('Operation', operationId)
    if (operation.status !== OperationStatus.RUNNING) {
      throw new Error('Operation is not running')
    }
    if (operation.restaurantId !== order.restaurantId) {
      throw new ForbiddenError('Operation is not for this restaurant')
    }
    order.assignToOperation(operationId)
    await this.OrderRepository.update({ id: orderId }, order)
  }
}
