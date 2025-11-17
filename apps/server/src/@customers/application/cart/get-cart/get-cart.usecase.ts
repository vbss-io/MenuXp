import { BadRequestError, NotFoundError } from '@api/domain/errors'
import { inject } from '@api/infra/dependency-injection/registry'

import { GetCartType } from '@customers/application/cart/get-cart/get-cart.schema'
import { Cart } from '@customers/domain/cart/cart.entity'
import type { CartRepository } from '@customers/infra/repositories/cart.repository'
import type { CustomerUserRepository } from '@customers/infra/repositories/customer-user.repository'

export class GetCartUsecase {
  @inject('CustomerUserRepository')
  private readonly CustomerUserRepository!: CustomerUserRepository

  @inject('CartRepository')
  private readonly CartRepository!: CartRepository

  async execute(input: GetCartType): Promise<Cart> {
    if (input.clientId) {
      const client = await this.CustomerUserRepository.findById(input.clientId)
      if (!client) throw new NotFoundError('Customer User', input.clientId)
      if (client.restaurantId !== input.restaurantId)
        throw new BadRequestError('Customer does not belong to this restaurant')
    }
    const query = input.clientId
      ? { clientId: input.clientId, restaurantId: input.restaurantId }
      : { sessionId: input.sessionId, restaurantId: input.restaurantId }
    let cart = await this.CartRepository.findOne(query)
    if (!cart) {
      cart = Cart.create({
        clientId: input.clientId,
        sessionId: input.sessionId,
        restaurantId: input.restaurantId
      })
      cart = await this.CartRepository.create(cart)
    }
    const groupedItems = cart.getGroupedItems()
    return Cart.restore({
      id: cart.id as string,
      clientId: cart.clientId,
      sessionId: cart.sessionId,
      restaurantId: cart.restaurantId,
      items: groupedItems,
      createdAt: cart.createdAt as Date,
      updatedAt: cart.updatedAt as Date
    })
  }
}
