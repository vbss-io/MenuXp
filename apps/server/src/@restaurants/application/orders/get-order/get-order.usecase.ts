import { NotFoundError } from '@api/domain/errors'
import { inject } from '@api/infra/dependency-injection/registry'
import { GetOrderType } from '@restaurants/application/orders/get-order/get-order.schema'
import { Order } from '@restaurants/domain/orders/orders.entity'
import { OrderRepository } from '@restaurants/infra/repositories/orders.repository'
import { RestaurantRepository } from '@restaurants/infra/repositories/restaurant.repository'
import { UserRepository } from '@restaurants/infra/repositories/user.repository'

type GetOrderUsecaseInput = GetOrderType & {
  userId: string
}

export class GetOrderUsecase {
  @inject('UserRepository')
  private readonly UserRepository!: UserRepository

  @inject('RestaurantRepository')
  private readonly RestaurantRepository!: RestaurantRepository

  @inject('OrderRepository')
  private readonly OrderRepository!: OrderRepository

  async execute(input: GetOrderUsecaseInput): Promise<Order> {
    const { userId, orderId } = input
    const user = await this.UserRepository.findById(userId)
    if (!user) throw new NotFoundError('User', userId)
    const order = await this.OrderRepository.findById(orderId)
    if (!order) throw new NotFoundError('Order', orderId)
    const restaurant = await this.RestaurantRepository.findById(order.restaurantId)
    if (!restaurant) throw new NotFoundError('Restaurant', order.restaurantId)
    return order
  }
}
