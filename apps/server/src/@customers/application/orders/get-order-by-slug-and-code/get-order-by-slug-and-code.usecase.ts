import { NotFoundError } from '@api/domain/errors'
import { inject } from '@api/infra/dependency-injection/registry'

import { GetOrderBySlugAndCodeType } from '@customers/application/orders/get-order-by-slug-and-code/get-order-by-slug-and-code.schema'

import { Order } from '@restaurants/domain/orders/orders.entity'
import { OrderRepository } from '@restaurants/infra/repositories/orders.repository'
import { RestaurantRepository } from '@restaurants/infra/repositories/restaurant.repository'

export type GetOrderBySlugAndCodeUsecaseOutput = Order

export class GetOrderBySlugAndCodeUsecase {
  @inject('RestaurantRepository')
  private readonly RestaurantRepository!: RestaurantRepository

  @inject('OrderRepository')
  private readonly OrderRepository!: OrderRepository

  async execute({ restaurantSlug, orderCode }: GetOrderBySlugAndCodeType): Promise<GetOrderBySlugAndCodeUsecaseOutput> {
    const restaurant = await this.RestaurantRepository.findOne({ slug: restaurantSlug })
    if (!restaurant) throw new NotFoundError('Restaurant', restaurantSlug)
    const order = await this.OrderRepository.findOne({
      code: orderCode,
      restaurantId: restaurant.id as string
    })
    if (!order) throw new NotFoundError('Order', orderCode)
    return order
  }
}
