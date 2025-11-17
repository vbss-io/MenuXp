import { NotFoundError } from '@api/domain/errors/not-found.error'
import { inject } from '@api/infra/dependency-injection/registry'

import { GetOrdersByClientPhoneType } from '@customers/application/orders/get-orders-by-client-phone/get-orders-by-client-phone.schema'
import { CustomerUserRepository } from '@customers/infra/repositories/customer-user.repository'

import { Order } from '@restaurants/domain/orders/orders.entity'
import { OrderRepository } from '@restaurants/infra/repositories/orders.repository'

export class GetOrdersByClientPhoneUsecase {
  @inject('CustomerUserRepository')
  private readonly CustomerUserRepository!: CustomerUserRepository

  @inject('OrderRepository')
  private readonly OrderRepository!: OrderRepository

  async execute(input: GetOrdersByClientPhoneType): Promise<Order[]> {
    const client = await this.CustomerUserRepository.findOne({
      phone: input.phone,
      restaurantId: input.restaurantId
    })
    if (!client) throw new NotFoundError('Client', input.phone)
    const orders = await this.OrderRepository.find({
      clientId: client.id,
      restaurantId: input.restaurantId
    })
    return orders
  }
}
