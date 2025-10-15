import { ForbiddenError, NotFoundError } from '@api/domain/errors'
import { inject } from '@api/infra/dependency-injection/registry'
import { DeleteOrderType } from '@restaurants/application/orders/delete-order/delete-order.schema'
import { OrderRepository } from '@restaurants/infra/repositories/orders.repository'
import { RestaurantRepository } from '@restaurants/infra/repositories/restaurant.repository'
import { UserRepository } from '@restaurants/infra/repositories/user.repository'

type DeleteOrderUsecaseInput = DeleteOrderType & {
  userId: string
}

export class DeleteOrderUsecase {
  @inject('UserRepository')
  private readonly UserRepository!: UserRepository

  @inject('RestaurantRepository')
  private readonly RestaurantRepository!: RestaurantRepository

  @inject('OrderRepository')
  private readonly OrderRepository!: OrderRepository

  async execute({ userId, orderId }: DeleteOrderUsecaseInput): Promise<void> {
    const user = await this.UserRepository.findById(userId)
    if (!user) throw new NotFoundError('User', userId)
    const order = await this.OrderRepository.findById(orderId)
    if (!order) throw new NotFoundError('Order', orderId)
    const restaurant = await this.RestaurantRepository.findById(order.restaurantId)
    if (!restaurant) throw new NotFoundError('Restaurant', order.restaurantId)
    if (!restaurant.hasPermission(userId)) throw new ForbiddenError('User does not have permission to delete order')
    await this.OrderRepository.delete({ id: orderId })
  }
}
