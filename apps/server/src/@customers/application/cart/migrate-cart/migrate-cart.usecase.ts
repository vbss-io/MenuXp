import { BadRequestError, NotFoundError } from '@api/domain/errors'
import { inject } from '@api/infra/dependency-injection/registry'

import { MigrateCartType } from '@customers/application/cart/migrate-cart/migrate-cart.schema'
import { Cart } from '@customers/domain/cart/cart.entity'
import type { CartRepository } from '@customers/infra/repositories/cart.repository'
import type { CustomerUserRepository } from '@customers/infra/repositories/customer-user.repository'

export class MigrateCartUsecase {
  @inject('CustomerUserRepository')
  private readonly CustomerUserRepository!: CustomerUserRepository

  @inject('CartRepository')
  private readonly CartRepository!: CartRepository

  async execute(input: MigrateCartType): Promise<Cart> {
    const client = await this.CustomerUserRepository.findById(input.clientId)
    if (!client) throw new NotFoundError('Customer User', input.clientId)
    if (client.restaurantId !== input.restaurantId) {
      throw new BadRequestError('Customer does not belong to this restaurant')
    }
    const sessionCart = await this.CartRepository.findOne({
      sessionId: input.sessionId,
      restaurantId: input.restaurantId
    })
    let clientCart = await this.CartRepository.findOne({
      clientId: input.clientId,
      restaurantId: input.restaurantId
    })
    if (!sessionCart || sessionCart.items.length === 0) {
      if (!clientCart) {
        clientCart = Cart.create({
          clientId: input.clientId,
          restaurantId: input.restaurantId
        })
        clientCart = await this.CartRepository.create(clientCart)
      }
      return clientCart
    }
    if (!clientCart) {
      const migratedCart = Cart.create({
        clientId: input.clientId,
        restaurantId: input.restaurantId,
        items: sessionCart.items
      })
      const savedCart = await this.CartRepository.create(migratedCart)
      await this.CartRepository.delete({ id: sessionCart.id })

      return savedCart
    } else {
      sessionCart.items.forEach((item) => {
        clientCart.addItem(item)
      })
      const updatedCart = await this.CartRepository.update({ id: clientCart.id }, clientCart)
      await this.CartRepository.delete({ id: sessionCart.id })
      return updatedCart
    }
  }
}
