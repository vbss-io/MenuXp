import { BadRequestError } from '@api/domain/errors/bad-request.error'
import { NotFoundError } from '@api/domain/errors/not-found.error'
import { inject } from '@api/infra/dependency-injection/registry'
import { CustomerUserRepository } from '@customers/infra/repositories/customer-user.repository'
import { GetOrdersByClientType } from '@customers/application/orders/get-orders-by-client/get-orders-by-client.schema'
import { Order } from '@restaurants/domain/orders/orders.entity'
import { OrderRepository } from '@restaurants/infra/repositories/orders.repository'

export interface GetOrdersByClientUsecaseOutput {
  orders: Order[]
}

export class GetOrdersByClientUsecase {
  @inject('CustomerUserRepository')
  private readonly CustomerUserRepository!: CustomerUserRepository

  @inject('OrderRepository')
  private readonly OrderRepository!: OrderRepository

  async execute(input: GetOrdersByClientType): Promise<GetOrdersByClientUsecaseOutput> {
    const client = await this.CustomerUserRepository.findById(input.clientId)
    if (!client) throw new NotFoundError('Client', input.clientId)
    if (client.restaurantId !== input.restaurantId) throw new BadRequestError('Client does not belong to restaurant')
    const orders = await this.OrderRepository.find({
      clientId: input.clientId,
      restaurantId: input.restaurantId
    })
    return { orders }
  }
}
