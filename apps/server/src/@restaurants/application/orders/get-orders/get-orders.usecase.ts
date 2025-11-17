import { ForbiddenError, NotFoundError } from '@api/domain/errors'
import { inject } from '@api/infra/dependency-injection/registry'

import { GetOrdersQuery } from '@restaurants/application/orders/@queries/get-orders.query'
import { GetOrdersType } from '@restaurants/application/orders/get-orders/get-orders.schema'
import { Order } from '@restaurants/domain/orders/orders.entity'
import { RestaurantRepository } from '@restaurants/infra/repositories/restaurant.repository'
import { UserRepository } from '@restaurants/infra/repositories/user.repository'

type GetOrdersUsecaseInput = GetOrdersType & {
  userId: string
}

export interface GetOrdersUsecaseOutput {
  total: number
  orders: Order[]
}

export class GetOrdersUsecase {
  @inject('UserRepository')
  private readonly UserRepository!: UserRepository

  @inject('RestaurantRepository')
  private readonly RestaurantRepository!: RestaurantRepository

  @inject('GetOrdersQuery')
  private readonly GetOrdersQuery!: GetOrdersQuery

  async execute({ userId, restaurantId, ...input }: GetOrdersUsecaseInput): Promise<GetOrdersUsecaseOutput> {
    const user = await this.UserRepository.findById(userId)
    if (!user) throw new NotFoundError('User', userId)
    const restaurant = await this.RestaurantRepository.findById(restaurantId)
    if (!restaurant) throw new NotFoundError('Restaurant', restaurantId)
    if (!restaurant.hasPermission(userId)) throw new ForbiddenError('User does not have permission to get orders')
    const result = await this.GetOrdersQuery.execute({
      restaurantId,
      ...input
    })
    return result
  }
}
